<!--
  blogList - List basic info for each blog (username, user profile,
    blog title, some control (delete)...)
-->

<script>
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import responsiveStore from '$stores/ResponsiveStore';
  import userStore   from "$stores/UserStore";   //  logged in user

  import Profile from "$lib/components/Profile.svelte";
  import DeleteBlog from "$lib/components/DeleteBlog.svelte";
  
  // blogsStore controls blogs, which can be modified in other components
  //  nb - blogs are loaded in  /src/layout.server.js
  
  $:blogs = $blogsStore;
  $:users = $usersStore;

  //  to add - no user logged in
  let username = $userStore.username;

  import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from "flowbite-svelte";

  function getImage(username){
    let tmp = users.filter(user=>user.username == username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }
  
  
</script>

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
        <DropdownItem>Delete</DropdownItem>
      </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
      <Avatar size="lg" class="bg-transparent" rounded src='/uploads/{getImage(blog.username)}'  />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{blog.username}</h5>
        <a href={`/blogList/${blog._id}`}>{blog.title}</a>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <Button>Add friend</Button>
          <Button color="light" class="dark:text-white">Message</Button>
        </div>
    </div>
  </Card>

  {/each}
</div>
