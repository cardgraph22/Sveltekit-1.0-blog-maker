<!--
  main page
-->
<script>
  import Homepage from "$lib/components/Homepage.svelte";
  import SidebarGames from "$lib/components/Sidebars/SidebarGames.svelte";
  import SidebarCities from "$lib/components/Sidebars/SidebarCities.svelte";
  import SidebarUsers from "$lib/components/Sidebars/SidebarUsers.svelte";
</script>
<div class="wrapper">
  <div class="sidebar1">
    <SidebarGames />
    <SidebarUsers />
  </div>
  <div class="main">
    <Homepage />
  </div>
  <div class="sidebar2">
    <SidebarCities />
  </div>
</div>
<style>
  .wrapper {
    display: flex;
  }
  .main {
    flex: 3;
    border: 1px solid gray;
    padding: 10px;
  }
  .sidebar1 {
    flex: 1;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
  }
  .sidebar2 {
    flex: 2;
    border: 1px solid orange;
  }
    
  @media screen and (max-width: 767px) {
    .wrapper {
      flex-direction: column;
      height: 100%;
    }
    .main     { order: 1; flex: 5 }
    .sidebar1 { order: 2; flex: 2 }
    .sidebar2 { order: 3; flex: 1 }
  }

</style>

<!--

  CSS properties such as height , width , border , margin , padding , etc. are not inherited.

-->