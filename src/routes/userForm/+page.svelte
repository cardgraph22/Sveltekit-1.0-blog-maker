<script>
  //
  //  userForm.svelte
  //
  import { enhance } from '$app/forms'
  //export let data;
  //console.log('form(data), loaded', data)

  export let form;
  //$: console.log('form(form), loaded', form)

  import userStore from "/src/stores/UserStore";
  let users = $userStore.user;

  let user = {
    username: '',
    password: '',
    confPwd: '',
    imagename: '',
    imageblob: Blob
  }
  //let confPwd = '';

  let newUser = true;
  let imgName = '';

  let uploadedImage = '';
  var imageblob;

  function handleImageUpload(e) {
    const imagename = e.target.files[0]
    if(!imagename)return;
    uploadedImage = URL.createObjectURL(imagename);
    console.log('upLoadedImage', uploadedImage)
    const reader = new FileReader()
    reader.addEventListener('load', function(){
      console.log('load image')
      imageblob=reader.result
      //console.log('reader result', reader.result)
      //console.log('imageblob', imageblob)
    })
    if(imagename){
      console.log('read image')
      reader.readAsDataURL(imagename)
    }
    //return imageblob
  }
  // The load event is fired when a file has been read successfully.
  //  "Both read and load can be input operations, but read
  //   focuses on the source of that input whereas load focuses
  //   on the destination of that transfer."

</script>

<h3>New User</h3>
<!--{#if user == ''}<p class="admon">Please log in to add user</p>{/if}-->

<form method="POST" use:enhance enctype="multipart/form-data">
  <div class="form-field">
    <label for="userName">User Name</label>
    <input type="text" id="username" name="username" bind:value={user.username}>
    {#if form?.errors?.username}
      <h6>{form?.errors?.username[0]}</h6>
    {/if}
    <label for="entry">Password</label>
    <input type="text" id="password" name="password" bind:value={user.password}>
    {#if form?.errors?.password}
      <h6>{form?.errors?.password[0]}</h6>
    {/if}
    <label for="entry">Confirm Password</label>
    <input type="text" id="confPwd" name="confPwd" bind:value={user.confPwd}>
    {#if form?.errors?.confPwd}
      <h6>{form?.errors?.confPwd[0]}</h6>
    {/if}
    <label for="imagename">Image</label>
    <input name='imagename' on:change={handleImageUpload} type="file" bind:value={user.imagename} />
    {#if form?.errors?.imagename}
      <h6>{form?.errors?.imagename[0]}</h6>
    {/if}
  </div>
  <!--
  {#if newUser}
    <ImgUpload bind:imgName/>
  {/if}
  -->

  {#if uploadedImage}
    <img src={uploadedImage} alt="noimage(yet)">
  {/if}
  <button>Add User</button>

  <p>{JSON.stringify(form)}</p>

  {#if form?.success}
    {JSON.stringify(form)}
    <p>successfully added user</p>
  {/if}

</form>

<style>

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