<script>
  //  blogList/[_id]  - expanded blog item
  import { Button, Textarea, Tooltip } from 'flowbite-svelte';
  import { enhance } from '$app/forms';

  export let data;
  //export let form;
  //console.log('/blogList/[_id], page.svelte, form', form);

  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  import usersStore  from "$stores/UsersStore";  //  all users
  import userStore   from "$stores/UserStore";   //  logged in user

  import BlogReplies from "$lib/components/BlogReplies.svelte";
  import DeleteBlog  from "$lib/components/DeleteBlog.svelte";
  import Profile     from "$lib/components/Profile.svelte";

  $usersStore = data.users;
  $:users = $usersStore;

  //  to add - no user logged in
  let username = $userStore.username;
  //console.log('page, username', username)
  //  data comes from the 'load' function
  $:blog = data.blog[0];

  let entryText;
  let showMsg;
  let showReplies = false;
  let txtMsg  = "Add a comment";  //  textarea 'placeholder'
  let depth = 0;
  let entry, replies;

  function showBlogReplies(){  // controlled (toggled) by speech icon 🗨️
    showReplies =! showReplies;
    if(showReplies==true)showMsg = 'Hide Replies'
  }

</script>

<!--<h3>blog id is {blog._id}</h3>-->

{#if blog}
  <div class="flex items-center">
    <Profile username={blog.username}/>
    <Button color="light" disabled={!blog.replies.length}
      on:click={()=>(showBlogReplies())}>🗨️ {blog.replies.length}
    </Button>
    <Tooltip color="blue">Show Comments</Tooltip>
    <h4>{blog.title}</h4>
  </div>

  <h4>{blog.entry}</h4>

  <form method="POST" action="?/comment" use:enhance>
    <input value={JSON.stringify({blog})} name="blog" type="hidden">
    <input value={username} name="LIusername" type="hidden">
    <Textarea class="mb-4" placeholder="Write a comment" name=entryText>
      <div slot="footer" class="flex items-center justify-between">
        <Button type="submit">Post comment</Button>
      </div>
    </Textarea>
  </form>

  {#if showReplies}
      {#if blog.replies.length > 0}
        {#each blog.replies as reply, idx}

          <BlogReplies {blog} {reply}/>

        {/each}
      {:else}
        no replies
      {/if}
    {/if}
  <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">
    Remember, contributions to this topic should follow our
    <a href="/" class="text-primary-600 dark:text-primary-500 hover:underline">
    Community Guidelines</a>.
  </p>
{/if}
