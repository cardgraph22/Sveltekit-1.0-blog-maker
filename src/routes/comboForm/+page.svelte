<script>
  //
  //  comboForm.svelte
  //  combines login and add new user
  //
  import { enhance, applyAction } from '$app/forms'
  import { Alert, Button, Input, Label } from 'flowbite-svelte'
  import { handleImageUpload } from '$api/handleImageUpload'

  //  nothing to load to client for comboForm
  //export let data;
  //console.log('form(data), loaded', data)

  export let form;
  //$: if(form)console.log('comboForm (form), client loaded', form)
  //  shouldnt this also log in user?
  $: {
    if(form?.username){
      //  this is the logged in user
      //console.log('loginForm, form', form)
      $userStore._id = form._id;
      $userStore.username = form.username;
      $userStore.imagename = form.imagename;
      //console.log('comboForm, $userStore', $userStore)
    }
  }

  import userStore from "/src/stores/UserStore";
  let users = $userStore.user;

  let user = {
    username: '',
    password: '',
    confPwd: '',
    imagename: '',
    imageblob: Blob
  }

  let newUser = false;
  let imageblob, uploadedImage;

  function getImage(e){
    [imageblob, uploadedImage] = handleImageUpload(e);
  }

  //  turn login button on/off depending on input
  let loginDisable = true;
  $:if((user.username.length > 0 && user.password.length > 0)
      ? loginDisable=false : loginDisable=true);

</script>

{#if newUser}
  <h3 class="flex justify-center">New User</h3>
{:else}
  <h3 class="flex justify-center">Login</h3>
{/if}

<div class="formborder">
<form method="POST" enctype="multipart/form-data"
  use:enhance={({ formElement }) => {
    return async({ result, update }) => {
      if(result.type === 'success'){
        formElement.reset();
      }
      if(result.type === 'invalid'){
        await applyAction(result);
      }
      update();
    }
  }}
>
  <div class="form-field">
    <input type="hidden" name="newUser" value={newUser} />

    <!--  username  -->
    <div class='mb-6'>
      <Label for='username' class='block mb-2'>User Name</Label>
      <Input id='username' placeholder="Enter User Name" name="username" bind:value={user.username} />
    </div>
    {#if form?.errors?.username}
      <Alert>
        <span class="font-medium">Default alert!</span>{form?.errors?.username[0]}
      </Alert>
      <h6>{form?.errors?.username[0]}</h6>
    {/if}

    <!--  password  -->
    <div class='mb-6'>
      <Label for='password' class='block mb-2'>Password</Label>
      <Input id='password' placeholder="Enter password" name="password" bind:value={user.password} />
    </div>
    {#if form?.errors?.password}
      <Alert>
        <span class="font-medium">Alert! </span>{form?.errors?.password[0]}
      </Alert>
      <h6>{form?.errors?.password[0]}</h6>
    {/if}

    <!--  confirm password (if new user)  -->
    {#if newUser}
      <label for="entry">Confirm Password</label>
      <input type="text" id="confPwd" name="confPwd" bind:value={user.confPwd}>
      {#if form?.errors?.confPwd}<h6>{form?.errors?.confPwd[0]}</h6>{/if}
      <label for="imagename">Image</label>
      <input name='imagename' on:change={getImage} type="file" bind:value={user.imagename} />
      {#if form?.errors?.imagename}<h6>{form?.errors?.imagename[0]}</h6>{/if}
    {/if}
  </div>

  {#if uploadedImage}
    <img src={uploadedImage} alt="noimage(yet)">
  {/if}

  {#if newUser}
    <!--<button>Add User</button>-->
    <Button type="submit" color="blue">Add User</Button>
  {:else}
    <Button disabled={loginDisable} type="submit" color="blue">Login</Button>
  {/if}

  <!--
  <p>JSON.stringify(form) is </p>
  <p>{JSON.stringify(form)}</p>
  -->

  
  {#if form?.success}
    <Alert color="green">
      {form?.msg}
    </Alert>
  {:else}
    <Alert color="red">
      {form?.msg}
    </Alert>
  {/if}
  <Button type="button" color="alternative" id='newUser' on:click={() => newUser = !newUser}>New User?</Button>
</form>
</div>
<!--  nb - if this button is inside the form tags, then clicking
           it 'submits' the form  -->
<!--<button id='newUser' on:click={() => newUser = !newUser}>New User?</button>-->

<style>
  /*
  .formborder {
    border: 1px solid blue;
  }
  */

  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  /*
  .form-field {
    display: flex;
    flex-direction: column;
  }
  */

  .form-field {
    margin:  18px auto;
    /*border: 1px solid red;*/
  }

  input {
    width: 100%;
    border-radius: 6px;
  }

  label {
    margin: 10px auto;
    text-align: left;
  }

  img {
    height: 50px;
    width: 50px;
  }

  /*
  .admon {
    color: rgb(120,24,74);
  }
  */

</style>