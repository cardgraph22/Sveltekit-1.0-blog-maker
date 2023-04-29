<script>
  //
  //  userForm.svelte
  //
  import { enhance } from '$app/forms'
  //export let data;
  //console.log('form(data), loaded', data)

  export let form;
  //$: console.log('form(form), loaded', form)

  import userStore from "../../stores/UserStore";
  //let users = $userStore.user;

  let user = {
    username: '',
    password: '',
    image: '',
    imageblob: Blob
  }
  let showErrors = false;

  let newUser = true;
  let imgName = '';

  let uploadedImage = '';
  var imageblob;

  function handleImageUpload(e) {
    const image = e.target.files[0]
    if(!image)return;
    uploadedImage = URL.createObjectURL(image);
    console.log('upLoadedImage', uploadedImage)
    const reader = new FileReader()
    reader.addEventListener('load', function(){
      console.log('load image')
      imageblob=reader.result
      console.log('reader result', reader.result)
      console.log('imageblob', imageblob)
    })
    if(image){
      console.log('read image')
      reader.readAsDataURL(image)
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
    <label for="entry">Password</label>
    <input type="text" id="password" name="password" bind:value={user.password}>
    <label for="image">Image</label>
    <input name='image' on:change={handleImageUpload} type="file" />

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

  {#if showErrors}
    <p>Fill in all fields</p>
  {/if}
</form>

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
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