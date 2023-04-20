<!--
  blogList - This combines prj23 BlogList and BlogEntries
-->

<script>
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user
  
  //  get the blogs (automatically) from the +page.server load (GET)
  export let data;
  // blogsStore controls blogs, which can be modified in other components
  $blogsStore = data.blogs;
  $usersStore = data.users;
  $:blogs = $blogsStore;
  $:users = $usersStore;

  //  to add - no user logged in
  //let username = $userStore.username;
  
  async function deleteBlog(blog, id) {
    console.log('deleteBlog, id', id)
    let res = await fetch(`http://localhost:5173/blogList?id=${id}`, { method: 'DELETE' } )
    res = await res.json();
    //  if the blog is deleted in the db, delete it in the list
    if(res.message === 'deleted'){
      $blogsStore = $blogsStore.filter(item => item._id != blog._id)
    }
  }

  function getImage(blog){
    let tmp = users.filter(user=>user.username == blog.username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }

</script>

<h3>Blogs</h3>
<div class="blog-list">
  {#each blogs as blog}
    <div class="blog-item">
      <div class="blog-profile">
        <h5>{blog.username}</h5>
        <img src='/src/uploads/{getImage(blog)}' alt="noImage">
      </div>           <!--  end  <div class="blog-profile"> -->
    <div class="blog-entry">
      <a href={`/blogList/${blog._id}`}>{blog.title}</a>

      <!--{#if blog.username === $userStore.username}-->
        <button on:click={(()=>deleteBlog(blog, blog._id))}>X</button>
      <!--{/if}-->
        <!-- 'disabled' doesnt work if class='btns' added -->
        <!--  but,  .btn:disabled {...  works-->
        <!--  this could go under 'user account management' -->
      </div>           <!--  end  <div class="blog-entry"> -->
    </div>             <!--  end  <div class="blog-item"> -->
  {/each}              <!--  end  {#each blogs as blog}   -->
</div>                 <!--  end  <div class="blog-list"> -->

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

  img {
    height: 30px;
    width: 30px;
    object-fit: contain;
    border-radius: 50%;
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