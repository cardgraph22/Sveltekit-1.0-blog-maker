<script>
  import "../app.postcss";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte'

  import { onMount } from 'svelte';
  //import Navbar from '$lib/components/Navbar.svelte';
  //import Footer from '$lib/components/Footer.svelte';

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
    //console.log('userStore (username) changed', $userStore.username)
  }

</script>

<div class="w-9/12 m-auto">
<Navbar let:hidden let:toggle>
  <NavBrand href="/"><img src="/cg22Logo.png"
     class="mr-3 h-6 sm:h-9" alt="cg22 Logo"/>
  </NavBrand>
  <span class='username text-gray-600'>{msg}</span>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi on:click={toggle} href="/blogList">List Blogs</NavLi>
    <NavLi on:click={toggle} href="/blogForm">Add Blog</NavLi>
    <NavLi on:click={toggle} href="/comboForm">Combo Form</NavLi>
    <NavLi on:click={toggle} href="/userForm">Add User</NavLi>
    <NavLi on:click={toggle} href="/loginForm">Login</NavLi>
  </NavUl>
</Navbar>

<slot />

<!-- <Footer/> -->


<Footer>
  <FooterCopyright href="/" by="Cg22™" year={2023} />
  <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <FooterLink href="/">About</FooterLink>
    <FooterLink href="/">Privacy Policy</FooterLink>
    <FooterLink href="/">Licensing</FooterLink>
    <FooterLink href="/">Contact</FooterLink>
  </FooterLinkGroup>
</Footer>

</div>