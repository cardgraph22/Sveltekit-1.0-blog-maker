<script>
  import { fade } from 'svelte/transition';
  import responsiveStore from '$stores/ResponsiveStore';
  import userStore from "$stores/UserStore";

  let msg = 'No one logged in'
  $: {
    $userStore;
    if($userStore.username != '') msg = $userStore.username;
    //console.log('layout, $userStore', $userStore);
  }
  $responsiveStore;
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
      <div class="menuText nav-rhs" style="display:flex;
         flex-direction:{$responsiveStore.menuFlexDirection}" transition:fade>
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

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: lightblue;
    padding: 10px;
    box-sizing: border-box;
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
  </style>