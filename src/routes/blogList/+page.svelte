<!--
  blogList - List basic info for each blog (username, user profile,
    blog title, some control (delete)...)
-->

<script>
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user
  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from "flowbite-svelte";
  import { Rating, Thumbup } from 'flowbite-svelte';


  export let data;
    //console.log('DATA blogList page.svelte', data)
    //console.log('DATA blogList page.svelte')

  // blogsStore controls blogs, which can be modified in other components
  $blogsStore = data.blogs;  
  $:blogs = $blogsStore;
  $:users = $usersStore;

  //  pre flowbite svelte
  //import responsiveStore from '$stores/ResponsiveStore';
  //import Profile from "$lib/components/Profile.svelte";
  //import DeleteBlog from "$lib/components/DeleteBlog.svelte";

  //  to add - no user logged in
  let username = $userStore.username;

  function getImage(username){
    let tmp = users.filter(user=>user.username == username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }

  async function deleteBlog(blog){
    //  todo - add authoirization and confirmation
    //console.log('deleteBlog, blogId', blog._id)
    try {   // "it (fetch) can make relative requests on the server"
      let res = await fetch(`/blogList?id=${blog._id}`, {   method: 'DELETE' } )
      //console.log('deleteBlog, res', res)
      res = await res.json();
      //  if the blog is deleted in the db, delete it in the list
      if(res.message === 'deleted'){
        $blogsStore = $blogsStore.filter(item => item._id != blog._id)
      }
    } catch(error) {
      console.error('deleteBlog catch error', error)
    }
  }
    
</script>

<style>
  #blogTitle {
    color: magenta;
  }
</style>

<h3>Blogs</h3>
<!--{$responsiveStore.type}--><!-- desktop or mobile -->
<div class="flex gap-2 flex-wrap">
  {#each blogs as blog}

  <!-- tailwind (svelte-flowbite) -->
  <Card padding='sm'>
    <div class="flex justify-end">
      <MenuButton />
      <Dropdown class="w-36">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
        <DropdownItem on:click={()=>deleteBlog(blog)}>Delete</DropdownItem>
      </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
      <Avatar size="lg" class="bg-transparent object-contain" rounded src='/uploads/{getImage(blog.username)}'  />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{blog.username}</h5>
        <a id="blogTitle" href={`/blogList/${blog._id}`}>{blog.title}</a>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <Button on:click={()=>{blog.likes++}}>Like {blog.likes}</Button>
          <!--<Rating on:click={()=>{blog.likes++}} icon={Thumbup}/>-->
          <Button color="light" class="dark:text-white">Message</Button>
        </div>
    </div>
  </Card>

  {/each}
</div>
