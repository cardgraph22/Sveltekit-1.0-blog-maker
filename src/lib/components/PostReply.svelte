<script>
  export let blog, replyToPost, entryText;
  import blogsStore from "$stores/BlogsStore";
  import userStore  from "$stores/UserStore";   //  logged in user
  let username = $userStore.username;

  const postReply = (replyToPost, entryText) => {
    //console.log('PostReply, username', username, replyToPost, entryText)
    let reply = {
      username: username,
      entry: entryText,
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
      //console.log('PostReply, posted reply', data.message)
      blog=data.message;
    })

  }
</script>

<button class='btn' on:click={()=>postReply(replyToPost, entryText)}>Post</button>