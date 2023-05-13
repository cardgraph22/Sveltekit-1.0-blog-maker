<script>
  export let blog, replyToPost, entryText;
  import blogsStore from "$stores/BlogsStore";
  import userStore  from "$stores/UserStore";   //  logged in user
  let username = $userStore.username;

  //  for the slug, blogList/[_id], the blog and the replyToPost are the same
  //  since they are on the same 'level', or 'depth'
  //  But, for BlogReplies, they are different, since we are pushg a 'reply'
  //  on a different 'level' or 'depth' onto the main blog

  //  blog - actually 'where to push entry' 
  //   ONto the main 'blog'
  //
  //  eg
  //  blog[_id]
  //  replies     <-  if here, push to head for this blog
  //    replies
  //      replies <- if here (should be passed in), push here,
  //        WHICH SHOULD UPDATE ENTIRE BLOG
  //
  //  then, in either case, post [updated, entire] to database
  //  WHICH UPDATES ENTIRE   REPLIES  (ie, blog.replies)

  // Q  do i need to pass in both main blog, and where to push entry
  //
  //    which in the case of the slug, the entry is pushed at the top level
  //    ie, a COMMENT
  //
  //  i need CURRENT (individual) blog (similar to 'current user')
  //
  //  entry - is the text of the blog reply; the reply object
  //    being pushed is built here


  const postReply = (replyToPost, entryText) => {
    //console.log('PostReply, username', username, replyToPost, entryText)
    let reply = {
      username: username,
      entry: entryText,
      replies: [],
      date: Date()
    }

    //  this 'level' is passed in
    //  so we add the 'new' reply
    //  which should update blog?

    replyToPost.replies.push(reply);

    fetch( '/blogPostReply', {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },

      // then, somehow, 'blog' object is also updated

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