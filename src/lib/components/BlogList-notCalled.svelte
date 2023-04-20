<!--
  blogList - This combines prj23 BlogList and BlogEntries
-->

<script>
  import BlogReplies from "$lib/components/BlogReplies.svelte";
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user
  
  //  get the blogs (automatically) from the +page.server load (GET)
  import { fade } from 'svelte/transition';
  export let data;
  // blogsStore controls blogs, which can be modified in other components
  $blogsStore = data.blogs;
  $usersStore = data.users;
  $:blogs = $blogsStore;
  $:users = $usersStore;
  
  //  to add - no user logged in
  let username = $userStore.username;
  
  //console.log('blogList, blogs', $blogsStore)
  //console.log('blogList, users', $usersStore)
  let entry   = [];
  let showMsg = [];
  let txtMsg  = "Add a comment";  //  textarea 'placeholder'

  let showReplies = [];
  //$: showReplies = [];
  //$: {
  //  if(showReplies[idx])showMsg='Hide Repiles'
  //  else showMsg='Show Repiles'
  //}

  async function deleteBlog(blog, id) {
    //console.log('deleteBlog, id', id)
    let res = await fetch(`http://localhost:5173/blogList?id=${id}`, { method: 'DELETE' } )
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

  function getImage(blog){
    let tmp = users.filter(user=>user.username == blog.username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }

  function showBlogReplies(idx){
    showReplies[idx] =! showReplies[idx];
    if(showReplies[idx]==true)showMsg[idx] = 'Hide Replies'
  }
</script>

<h3>Blogs</h3>
<div class="blog-list">
  {#each blogs as blog, idx}
    <!--<div class="blog-item" in:fade out:fade>-->
      <div class="blog-item">
      <div class="blog-profile">
        <img src='src/uploads/{getImage(blog)}' alt="noImage">
        <h5>{blog.username}</h5>
        <button class='speech' disabled={!blog.replies.length} on:click={()=>(showBlogReplies(idx))}>🗨️ {blog.replies.length}</button>
      </div>
      <div class="blog-entry">
        <h4>{blog.title}</h4>
        <p class='entry'>{blog.entry}</p>
        <textarea class='text-area' bind:value={entry[idx]} placeholder={txtMsg}></textarea>
        <div class="btns">
          <button class='btn' on:click={()=>postReply(blog, entry[idx])}>Post</button>
          <!-- {#if blog.username === $userStore.username} -->
            <button class='btn' on:click={(()=>deleteBlog(blog, blog._id))}>Delete blog</button>
          <!-- {/if} -->
        </div>
      </div>           <!--  end  <div class="blog-entry"> -->
    </div>             <!--  end  <div class="blog-item">  -->
    <!-- 'disabled' doesnt work if class='btns' added -->
    <!--  but,  .btn:disabled {...  works-->
    {#if showReplies[idx]}
      {#if blog.replies.length > 0}
        {#each blog.replies as reply}
          <BlogReplies {blog} {reply}/>
        {/each}
      {:else}
        no replies
      {/if}
    {/if}
  {/each}              <!--  end  {#each blogs as blog}   -->
</div>                 <!--  end  <div class="blog-list"> -->

<style>
  h3 {
    text-align: center;
    color: white;
  }
  p {
    color: gray;
  }
  .blog-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .blog-item {
    display: flex;
    align-items: center;
    max-width: 960px;
    background-color: white;
    margin: 5px auto;
    border-radius: 15px;
    padding: 5px;
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