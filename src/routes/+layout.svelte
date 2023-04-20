<script>
  //
  //  layout.svelte
  //
  //import { browser } from '$app/environment'
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import responsiveStore from '../stores/ResponsiveStore';
  //import Footer from '../lib/components/Footer-notCalled.svelte';

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

<div class="main-wrapper">
  <nav class='navbar'>
    <div class="logo">
      <a href="/" on:click={(()=>toggleBurger())}><img src="/cg22Logo.png" alt="Cg22"></a>
    </div>
      {#if !$responsiveStore.burgerOn}  <!-- burger off -->
        <div class="menuText nav-rhs"
             style="display:flex; flex-direction:{$responsiveStore.menuFlexDirection}">
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
  <!--<div class='login-msg'>Logged In: { msg }</div>-->
    <slot></slot>
  <div class="footer">
    <div class="copyright">Copyright 2023</div>
  </div>
  <!--<Footer />-->
</div>

<style>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    padding: 10px;

  }
  .footer{
    margin-top: auto;
    text-align: center;
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
  /*
  .login-msg {
    color: gray;
  }
  */
  .burger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    width: 25px;
    height: 21px;
    background-color: lightgray;
  }
  .burger .bar {
    height: 2px;
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
  .copyright{
    color: #aaa;
    font-size: 14px;
    display: inline-block;
    padding: 20px;
    border-top: 1px solid #ddd;
  }
</style>