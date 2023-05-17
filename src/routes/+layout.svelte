<script>
  //
  //  layout.svelte
  //
  //import { browser } from '$app/environment'
  import { onMount } from 'svelte';
  import responsiveStore from '$stores/ResponsiveStore';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  export let data;
  $blogsStore = data.blogs;
  $usersStore = data.users;

  import '/src/css/app.css'
  //import '/src/pico.min.css'

  onMount(()=>{
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (window.matchMedia("(min-width: 768px)").matches) {
      //  the width is > 786
      //console.log('window match')
      $responsiveStore = { type:'desktop', burgerOn:false, menuFlexDirection:'row' };
    }
    const setResponsive = e => {
      //console.log('mediaQuery, window.innerWidth', window.innerWidth);
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

</script>

<div class="layout-wrapper">
  <div class='navbar'>
    <Navbar />   
  </div>
  <div class="content">
    <slot></slot>
  </div>
  <div class="footer">
    <Footer />
  </div>
</div>

<style>
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  /*
  .navbar {
    flex: 1;
  }
  */
  .content {
    flex: 1;
  }
  /*
  .footer {
    flex: 1;
  }
  */
</style>