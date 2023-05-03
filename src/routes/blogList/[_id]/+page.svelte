<script>
  export let data;

  import BlogReplies from "$lib/components/BlogReplies.svelte";
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user

  $usersStore = data.users;
  $:users = $usersStore;

  //  to add - no user logged in
  let username = $userStore.username;

  //console.log('blogItem, client, data', data)
  //console.log('blogItem, client, users', users)
  //console.log('blogItem, client, $usersStore', $usersStore)
  let blog = data.blog[0]

  let entry;
  let showMsg;
  let showReplies = false;
  let txtMsg  = "Add a comment";  //  textarea 'placeholder'

  //  blogsStore is undefined when a browser refresh takes place
  //  because this code is run on the server
  //import blogsStore  from "$stores/BlogsStore";  //  all blogs
  //console.log('blogItem, client, $blogsStore', $blogsStore)

  //let blog = $blogsStore.filter(item => item._id == data._id)
  //console.log('blogItem, +page.svelte, blog', blog)

  function getImage(blog){
    let tmp = users.filter(user=>user.username == blog.username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }
  function showBlogReplies(){  // controlled by speech icon 🗨️
    showReplies =! showReplies;
    if(showReplies==true)showMsg = 'Hide Replies'
  }

  async function deleteBlog(blog, id) {
    //console.log('deleteBlog, id', id)
    let res = await fetch(`https://sveltekit-1-0-blog-maker.vercel.app/blogList?id=${id}`, { method: 'DELETE' } )
    res = await res.json();
    //  if the blog is deleted in the db, delete it in the list
    if(res.message === 'deleted'){
      $blogsStore = $blogsStore.filter(item => item._id != blog._id)
    }
  }

  function postReply(blog, entry){
    console.log('postReply, entry', entry)
    let reply = {
      username: username,
      entry: entry,
      replies: [],
      date: Date()
    }
    blog.replies.push(reply);
    fetch( '/blogPostReply', {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(blog)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('blogList, posted reply', data)
      $blogsStore = $blogsStore;
    })
  }
</script>

<h3>Your blog choice is {blog._id}</h3>

{#if blog}
  <div class="blog-item">
    <div class="blog-profile">
      <img src='/uploads/{getImage(blog)}' alt="noImage">
      <h5>{blog.username}</h5>
      <button class='speech' disabled={!blog.replies.length}
        on:click={()=>(showBlogReplies())}>🗨️ {blog.replies.length}</button>
    </div>           <!--  end  <div class="blog-profile"> -->
    <div class="blog-entry">
      <h4>{blog.title}</h4>
      <p class='entry'>{blog.entry}</p>
      <textarea class='text-area' bind:value={entry} placeholder={txtMsg}></textarea>
      <div class="btns">
        <button class='btn' on:click={()=>postReply(blog, entry)}>Post</button>
        <!-- {#if blog.username === $userStore.username} -->
          <button class='btn' on:click={(()=>deleteBlog(blog, blog._id))}>Delete blog</button>
        <!-- {/if} -->
      </div>
    </div>           <!--  end  <div class="blog-entry"> -->
  </div>             <!--  end  <div class="blog-item">  -->
  {#if showReplies}
      {#if blog.replies.length > 0}
        {#each blog.replies as reply}
          <BlogReplies {blog} {reply}/>
        {/each}
      {:else}
        no replies
      {/if}
    {/if}
  {/if}


<a href="/blogList">Back to list</a>

<style>
  h3 {
    text-align: center;
    color: white;
  }

  p {
    color: gray;
  }

  .blog-item {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
    margin: 10px;
    border: 1px solid gray;
  }

  .blog-profile {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blog-entry {
    flex: 5;
    display: flex;
    flex-direction: column;
    width: 400px;
    border: 1px solid lightgray;
    border-radius: 15px;
    padding: 10px;
  }
  .entry {
    color: #303030
  }
  textarea {
    height: 2rem;
  }

  .btns {
    display: flex;
  }
  .speech {
    width: 70px;
    background-color: transparent;
    cursor: pointer;
    border: none;
    color: black;
  }
  .speech:disabled{
    color: gray;
    cursor: auto;
  }
</style>