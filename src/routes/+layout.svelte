<script>
  //
  //  layout.svelte
  //
  //import { browser } from '$app/environment'
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import responsiveStore from '../stores/ResponsiveStore';

  import '../app.css'
  //import '/src/pico.min.css'
  import userStore from "$stores/UserStore";

  let msg = 'No one logged in'
  $: {
    $userStore;
    if($userStore.username != '') msg = $userStore.username;
    //console.log('layout, $userStore', $userStore);
  }

  onMount(()=>{
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (window.matchMedia("(min-width: 768px)").matches) {
      //  the width is > 786
      console.log('window match')
      $responsiveStore = { type:'desktop', burgerOn:false, menuFlexDirection:'row' };
    }
    const setResponsive = e => {
      console.log('mediaQuery, window.innerWidth', window.innerWidth);
      if(e.matches){
        //console.log('The window is now over 768px');
        $responsiveStore = { type:'desktop', burgerOn:false, menuFlexDirection:'row' };
      } else {
        //console.log('The window is now 768px or under');
        $responsiveStore = { type:'mobile', burgerOn:true, menuFlexDirection:'column' };
      }
    }
    mediaQuery.addEventListener('change', setResponsive);
  });

  const toggleBurger = () => {
    //  leave alone if in desktop mode (non-mobile)
    if($responsiveStore.menuFlexDirection==='row')return;
    //  in mobile mode, toggle between burger and menu
    $responsiveStore.burgerOn = !$responsiveStore.burgerOn;
  }
</script>

<nav class='navbar'>
  <div class="logo">
    <a href="/" on:click={(()=>toggleBurger())}><img src="/cg22Logo.png" alt="Cg22"></a>
  </div>
    {#if !$responsiveStore.burgerOn}  <!-- burger off -->
      <div class="menuText nav-rhs"
            style="display:flex;
            flex-direction:{$responsiveStore.menuFlexDirection}"
            transition:fade>
        <a href="/blogList"    on:click={(()=>toggleBurger())}>List Blogs</a>
        <a href="/blogForm"    on:click={(()=>toggleBurger())}>Add Blog</a>
        <a href="/userForm"    on:click={(()=>toggleBurger())}>Add User</a>
        <a href="/loginForm"   on:click={(()=>toggleBurger())}>Login</a>
        <a href="/development" on:click={(()=>toggleBurger())}>development</a>
      </div>
    {:else}
      <!-- mobile menu, icon (burger) -->
      <button class='burger' on:click={(()=>toggleBurger())}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    {/if}

</nav>
<div class='loginmsg'>Logged In: { msg }</div>
<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    padding: 10px;
  }
  .navbar a {
    text-decoration: none;
    color: #404040;
    /*padding-right: 10px;*/
  }
  .navbar a:hover {
    color: black;
  }
  .nav-rhs {
    gap: 10px;
  }
  .logo {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
  }
  img {
    height: 30px;
    width: 30px;
    transform: scale(.7);
    border-radius: 0;
  }
  .loginmsg {
    color: gray;
  }
  .burger {

    display: flex;
    cursor: pointer;
        /*
    position: absolute;
    top: .75rem;
    right: 1rem;
        */
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;

  }
  .burger .bar {
    height: 3px;
    width: 100%;
    background-color: gray;
    border-radius: 10px;
  }

  .menuText {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .menuText {
      position: absolute;
      top: 55px;
      right: 10px;
      padding: 10px;
      background-color: white;
      border: 1px solid lightgray;
      border-radius: 10px;
      z-index: 1;
    }
  }
/*

desktop  (match all devices of that width and wider)
  the 'min'imum width of this display mode is  767 pixels
  @media screen and (min-width: 767px) {

mobile  (match all devices of that width and narrower)
  the 'max'imum width of this display mode is  767 pixels
  @media screen and (max-width: 767px) {

*/
</style>

<slot></slot>

<!--
// Remove media query listener on destroy (user SSR)
//onDestroy(() => {
//  console.log('layout, mediaQuery 3', mediaQuery)
//  if(browser){
//    alert('Navbar, mediaListener removed')
//  }
//  //const mediaQuery = window.matchMedia("(max-width: 767px)");
//  //mediaQuery.removeEventListener('change', setResponsive)
//});
-->