<script>
  import "../app.postcss";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'

  import { onMount } from 'svelte';
  //import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user
  export let data;
  $blogsStore = data.blogs;
  $usersStore = data.users;
  let msg = 'No one logged in'
  $: {
    $userStore;
    if($userStore.username != '') msg = $userStore.username;
    //console.log('layout, $userStore', $userStore);
  }

</script>

<div class="w-9/12 m-auto">
<Navbar let:hidden let:toggle>
  <NavBrand href="/"><img src="/cg22Logo.png"
     class="mr-3 h-6 sm:h-9" alt="cg22 Logo"/>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/blogList">List Blogs</NavLi>
    <NavLi href="/blogForm">Add Blog</NavLi>
    <NavLi href="/comboForm">Combo Form</NavLi>
    <NavLi href="/userForm">Add User</NavLi>
    <NavLi href="/loginForm">Login</NavLi>
  </NavUl>
</Navbar>
<span class='username text-gray-600 pl-5'>{msg}</span>
<slot />
<Footer/>
</div>