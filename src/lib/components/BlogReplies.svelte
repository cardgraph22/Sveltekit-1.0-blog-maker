<script>
  export let blog;
  export let reply;
  const {username, entry, replies} = reply;

  export let depth = 0;
  //console.log('BlogReplies, currentUser', currentUser)

  import { fade } from "svelte/transition";

  import blogsStore from "../../stores/BlogsStore";
  import usersStore from "$stores/UsersStore";  

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
  function getImage(username){
    let tmp = $usersStore.filter(user=>user.username == username)
    return (tmp.length>0 ? tmp[0].imagename : 'avatar.png')
  }
  
</script>

<!--<div class="replies" in:fade out:fade>-->
<div class="replies" in:fade out:fade>
  <div class="reply-item">
    <div class="reply-profile">
      <img src='src/uploads/{getImage(username)}' alt="noImage">
      <h4>{username}</h4>
    </div>
    <div class="blog-reply">
      {#if depth==0}
        <h2>this is a comment</h2>
      {:else}
        <h2>this is a reply</h2>
      {/if}
       <h3>entry: {entry}</h3>
       <h4>depth: {depth}</h4>
      <textarea  class='text-area' bind:value={msg} placeholder={txtMsg}></textarea>
      <button class='btn' on:click={()=>postReply(reply, msg)}>Post</button>
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
    padding-left: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;  /* very light gray */
    width: 800px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .reply-item {
    display: flex;
  }
  .reply-profile {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .blog-reply {
    flex: 5;
    display: flex;
    flex-direction: column;
  }
  .sub-reply {
    box-sizing: border-box;
  }
</style>