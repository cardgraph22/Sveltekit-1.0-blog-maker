<script>

  //  blogList/[_id]  - expanded blog item

  export let data;

  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user

  import BlogReplies from "$lib/components/BlogReplies.svelte";
  import DeleteBlog  from "$lib/components/DeleteBlog.svelte";
  import PostReply   from "$lib/components/PostReply.svelte";
  import Profile     from "$lib/components/Profile.svelte";

  $usersStore = data.users;
  $:users = $usersStore;

  //  to add - no user logged in
  let username = $userStore.username;

  //console.log('blogItem, client, data', data)
  //console.log('blogItem, client, users', users)
  //console.log('blogItem, client, $usersStore', $usersStore)
  let blog = data.blog[0]

  let entryText;
  let showMsg;
  let showReplies = false;
  let txtMsg  = "Add a comment";  //  textarea 'placeholder'


  function showBlogReplies(){  // controlled by speech icon 🗨️
    showReplies =! showReplies;
    if(showReplies==true)showMsg = 'Hide Replies'
  }

</script>

<!--<h3>blog id is {blog._id}</h3>-->

{#if blog}
  <div class="blog-item">
    <div class="blog-profile">
      <Profile username={blog.username}/>
      <button class='speech' disabled={!blog.replies.length}
        on:click={()=>(showBlogReplies())}>🗨️ {blog.replies.length}</button>
    </div>           <!--  end  <div class="blog-profile"> -->
    <div class="blog-entry">
      <h4>{blog.title}</h4>
      <p class='entry'>{blog.entry}</p>
      <textarea class='text-area' bind:value={entryText} placeholder={txtMsg}></textarea>
      <div class="btns">
        <PostReply bind:blog={blog} replyToPost={blog} {entryText} />
        <!-- {#if blog.username === $userStore.username} -->
        <DeleteBlog blog={blog}/>
        <!-- {/if} -->
      </div>
    </div>           <!--  end  <div class="blog-entry"> -->
    <a class='backToList' href="/blogList">Back to list</a>
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


<style>
  p {
    color: gray;
  }

  .blog-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
    margin: 10px;
    border: 1px solid black;
  }

  .blog-profile {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .blog-entry {
    flex: 5;
    display: flex;
    flex-direction: column;
    min-width: 80%;
    border: 1px solid lightgray;
    border-radius: 15px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .entry {
    color: #303030
  }
  textarea {
    height: 2rem;
  }

  .btns {
    display: flex;
    align-items: center;
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
  .backToList {
    color: gray;
    cursor: pointer;
    text-decoration: none;
  }
</style>