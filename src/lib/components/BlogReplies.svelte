<script>
  import PostReply from "$lib/components/PostReply.svelte";
  export let blog;
  export let reply;
  const {username, entry, replies} = reply;

  export let depth = 0;
  //console.log('BlogReplies, currentUser', currentUser)

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

    //  the 'input argument' handles the 'depth'



    replyToPost.replies.push(reply);

    fetch( '/blogPostReply', {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(blog)
    })
    .then(resp => resp.json())
    .then(data => {
      $blogsStore = $blogsStore;
    })
  }

</script>

<!--<div class="replies" in:fade out:fade>-->
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
      <textarea  class='text-area' bind:value={msg} placeholder={txtMsg}></textarea>


      <PostReply bind:blog={blog} replyToPost={reply} entryText={msg} />


      <!-- <button class='btn' on:click={()=>postReply(reply, msg)}>Post</button> -->


      <!--<p>Sub-replies = {replies.length}</p>-->
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
  }
  .reply-entry {
    flex: 5;
    display: flex;
    flex-direction: column;
    border: 1px solid lightblue;
    border-radius: 5px;
  }
  /*
  .sub-reply {
    box-sizing: border-box;
  }
  */
</style>