<script>
  //
  //  blogForm - +page.svelte (client)
  //    fill in and post a comment/reply to a blog entry
  //
  //    user logged in, else anonymous?
  //

  import { enhance } from '$app/forms'
  //export let data;
  //console.log('form(data), loaded', data)
  import userStore from "$stores/UserStore";
  let username = $userStore.username;

  let blog = {
    username: username,
    title: '',
    entry: '',
    replies: []
  }
  let showErrors = false;

</script>

<div class="blog-form">
<h3>Add Blog Entry</h3>
<!--{#if user == ''}<p class="admon">Please log in to add blog</p>{/if}-->

<form method="POST" use:enhance>
  <div class="form-field">
    {blog.username}
    <input type="hidden" name="username" value={blog.username}>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" bind:value={blog.title}>
    <label for="entry">Blog Entry</label>
    <textarea name="entry" id="entry" cols="30" rows="10" bind:value={blog.entry}></textarea>
    <button class='btn'>AddBlog</button>
  </div>

  {#if showErrors}
    <p>Fill in all fields</p>
  {/if}
</form>
</div>

<style>
  .blog-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 30px;
    /*background-color: white;*/
  }
  /*
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  */


  .form-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }


  /*
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

  textarea {
    width: 100%;
    border-radius: 6px;
  }
  */
  /*
  .admon {
    color: rgb(120,24,74);
  }
  */

</style>