<script>
  export let blog;
  export let reply;
  const {username, entry, replies} = reply;
  import { page } from '$app/stores';  
  let url = $page.url.pathname;         //                 [id]
  //console.log('BlogReplies page', p)  //  eg, /blogList/64c2572ef8f0d75e2476e715

  export let depth = 0;
  //console.log('BlogReplies, currentUser', currentUser)
  
  import { Button, Textarea, Tooltip } from 'flowbite-svelte';
  import { fade } from "svelte/transition";
  import blogsStore from "../../stores/BlogsStore";
  import usersStore from "$stores/UsersStore";
  import Profile from "$lib/components/Profile.svelte";

  let msg = '';
  let txtMsg  = "Add a reply";  //  textarea 'placeholder'

  const postReply = (replyToPost, msg) => {
    let reply = {
      username: username,
      entry: msg,
      replies: [],
      date: Date()
    }

    replyToPost.replies.push(reply);

    fetch({url}, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(blog)
    })
    .then(resp => resp.json())
    .then(data => {
      blog=data.message;
      //console.log('BlogReplies after fetch, blog')
      //console.log(blog)
      //$blogsStore = $blogsStore;
      //return blog;
    }).catch(error => {
      console.log('fetch error in BlogReplies')
    })
  }

</script>

<!--  big project, convert this to a form  -->
<!--  i think i tried this and had no luck -->
<!--  for one, BlogReplies is a component, not a /route-->

<div class="replies">
  <div class="reply-item">
    <div class="reply-profile">
      <Profile username={username}/>
    </div>
    <div class="reply-entry">
      {#if depth==0}
        <h4>this is a comment</h4>
      {:else}
        <h4>this is a reply</h4>
      {/if}
      <h3>entry: {entry}</h3>
      <h4>depth: {depth}</h4>
      <Textarea class="mb-4" placeholder="Add a reply" bind:value={msg}>
        <div slot="footer" class="flex items-center justify-between">
          <Button on:click={()=>postReply(reply, msg)}>Post reply</Button>
        </div>
      </Textarea>

      <!--
      <textarea  class='text-area' bind:value={msg} placeholder={txtMsg}></textarea>
      <button class='btn' on:click={()=>postReply(reply, msg)}>Post</button>
      -->
    </div>
  </div>

  {#if replies && replies.length > 0}
    {#each replies as reply}
      <div class="sub-reply">
        <svelte:self {blog} bind:reply depth={++depth} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .replies {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    padding-left: 30px;
    margin-top: 20px;
    overflow: hidden;
  }
  .reply-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
    margin: 10px;
    border: 1px solid gray;
    align-items: stretch;
  }
  .reply-profile {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .reply-entry {
    flex: 5;
    display: flex;
    flex-direction: column;
    border: 1px solid lightblue;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  /*
  .sub-reply {
    box-sizing: border-box;
  }
  */
</style>