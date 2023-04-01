<script>
  //
  //  layout.svelte
  //
  import '../app.css'
  //import '/src/pico.min.css'
  import userStore from "$stores/UserStore";

  let msg = 'No one logged in'
  $: {
    $userStore;
    if($userStore.username != '') msg = $userStore.username;
    //console.log('layout, $userStore', $userStore);
  }

</script>

<nav class='navbar'>
  <a href="/">Home Page</a>
  <div class="nav-rhs">
    <a href="/blogList">List Blogs</a>
    <a href="/blogForm">Add Blog</a>
    <a href="/userForm">Add User</a>
    <a href="/loginForm">Login</a>
    <a href="/development">development</a>
  </div>
</nav>
<div class='loginmsg'>Logged In: { msg }</div>
<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: lightblue;
  }
  .navbar a {
    text-decoration: none;
    color: #606060;
  }
  .navbar a:hover {
    color: black;
  }
  .nav-rhs {
    display: flex;
    gap: 15px;
  }
  .loginmsg {
    color: gray;
  }
</style>

<slot></slot>