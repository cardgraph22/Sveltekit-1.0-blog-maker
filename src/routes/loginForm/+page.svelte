<script>
  //
  //  loginForm.svelte
  //
  import { enhance } from '$app/forms'
  //export let data;
  //console.log('loginform(data), loaded', data)
  import userStore from "$stores/UserStore";
  export let form;

  //$: console.log('client, form', form)

  $: {
    if(form?.username){
      //  this is the logged in user
      //console.log('loginForm, form', form)
      $userStore._id = form._id;
      $userStore.username = form.username;
      $userStore.imagename = form.imagename;
      //console.log('loginForm, $userStore', $userStore)
    }
  }

  //  for learning
  //import { page } from '$app/stores';
  //console.log('$page.url', $page.url)

  let user = {
    username: '',
    password: ''
  }
  let showErrors = false;
</script>

<h3>Login</h3>
<!--{#if user == ''}<p class="admon">Please log in to add user</p>{/if}-->

<form method="POST" use:enhance>
  <div class="form-field">
    <label for="userName">User Name</label>
    <input type="text" id="username" name="username" bind:value={user.username}>

    <!-- to retain username in case other field(s) have error -->
    <!--   but we dont want to do this for password/confirm password -->
    <!-- But, I need to have the reactivity with username store -->
    <!--<input type="text" id="username" name="username" value={form?.data?.username}>-->

    {#if form?.errors?.username}
      <h6>{form?.errors?.username[0]}</h6>
    {/if}
    <label for="entry">Password</label>
    <input type="password" id="password" name="password" value={user.password}>
    {#if form?.errors?.password}
      <h6>{form?.errors?.password[0]}</h6>
    {/if}
  </div>
  <!--
  {#if newUser}
    <ImgUpload bind:imgName/>
  {/if}
  -->

  <button>Login</button>

  {#if form?.success}
    <p>Successfully logged in</p>
  {/if}

  {#if showErrors}
    <p>User not found</p>
  {/if}
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .form-field {
    margin:  18px auto;
  }
  input {
    width: 100%;
    border-radius: 6px;
  }
  label {
    margin: 10px auto;
    text-align: left;
  }
</style>