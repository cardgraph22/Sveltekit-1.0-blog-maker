<!--
  main page
-->
<script>
  import Sidebar1 from "../lib/components/Sidebar1.svelte";
  import Sidebar2 from "../lib/components/Sidebar2.svelte";
</script>
<div class="wrapper">
  <div class="sidebar1">
    <Sidebar1 />
  </div>
  <div class="main">
    <h2>Welcome to Blog-Maker</h2>
    <p>This project is intended for Sveltekit 1.0 developers.</p>
    <p>Its demonstrates recursive nested blog replies using the element:</p>
    <p class='coded'>&lt;svelte:self&gt;</p>
    <p>The documentation is in the README.MD file on github.
    As an added bonus, it uses MongoDB with Mongoose (if you're interested).
    As a double added bonus, it show how to upload images (/userForm)
    So click 'List Blogs', then click the conversation icon under the user to
     reveal comments/replies.</p>
    <figure class="fig-container">
      <img src="/uploads/monoline.png" alt="noImg">
      <figcaption>Hi, I'm Monoline</figcaption>
    </figure>
    <p>Then play around with the code and have fun!</p>
    <p>NB - This is still a work in progress: better css, authentication, et al</p>
  </div>
  <div class="sidebar2">
    <Sidebar2 />
  </div>
</div>
<style>
  .wrapper {
    display: flex;
  }
  .main {
    flex: 3;
    border: 1px solid gray;
  }
  .sidebar1 {
    flex: 1;
    border: 1px solid blue;
  }
  .sidebar2 {
    flex: 2;
    border: 1px solid orange;
  }
  
  h2 {
    font-size: 1.85em;

    margin: .8em 0;
  }
  p {
    font-size: 1.3em;

  }
  p.coded {
    text-align: center;
    color:blue;
  }
  figure {
    display: inline-block;
    text-align: center;
    width: 100%;
    margin: 0;
  }
  figcaption {
    color: gray;
    font-style: italic;
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