<!--
  blogList
-->

<script>
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import responsiveStore from '$stores/ResponsiveStore';
  import userStore   from "$stores/UserStore";   //  logged in user

  import Profile from "$lib/components/Profile.svelte";
  import DeleteBlog from "$lib/components/DeleteBlog.svelte";
  
  //  get the blogs (automatically) from the +page.server load (GET)

  // blogsStore controls blogs, which can be modified in other components
  
  $:blogs = $blogsStore;
  $:users = $usersStore;

  //  to add - no user logged in
  //let username = $userStore.username;
  
  
</script>

<h3>Blogs</h3>
<!--{$responsiveStore.type}--><!-- desktop or mobile -->
<div class="blog-list">
  {#each blogs as blog}
    <div class="blog-item">
      <div class="blog-profile">
        <Profile username={blog.username}/>
      </div>
      <div class="blog-entry">
        <a href={`/blogList/${blog._id}`}>{blog.title}</a>
        <DeleteBlog blog={blog}/>
      </div>
    </div>
  {/each}
</div>

<style>
  h3 {
    text-align: center;
    color: gray;
  }
 
  .blog-list {
    display: flex;
    flex-direction: column;
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
  }

  .blog-entry {
    flex: 10;
    display: flex;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    font-size: larger;
    color: black;
  }

  a:hover {
    background-color: lavenderblush;
  }

</style>


<!--<div class="blog-item" in:fade out:fade>-->
  <!--  nb - fade here fouls up other pages (flash effect)-->


<!--{#if blog.username === $userStore.username}-->
<!-- <button type='button' on:click={(()=>deleteBlog(blog, blog._id))}>X</button> -->
<!--{/if}-->
  <!-- 'disabled' doesnt work if class='btns' added -->
  <!--  but,  .btn:disabled {...  works-->
  <!--  this (delete blog) could go under 'user account management' -->