# Sveltekit 1.0 blog maker

 Sveltekit 1.0 blog maker with recursive replies.

This is a blog maker which allows nested, indented replies.
It also uses Mongoose (MongoDB) for the database, and has basic
login (no authentication, yet) and image upload capabilities.

The replies are nested and indented based on their 'depth':
<pre>
  Blog entry
    Comment
      Reply              depth 0  
        Sub-reply        depth 1  
          Sub-sub-reply  depth 2  
        Sub-reply        depth 1  
      Comment
   and so on
</pre>
The pseudo-code looks something like this:

```html
<pre>
  <div class="replies" in:fade out:fade>
    {#each blogs as blog}
      {#each blog.replies as reply}
        <BlogReplies {blog} {reply}/>
          {#each replies as reply}
            <svelte:self {blog} bind:reply depth={++depth} />
          {/each}
      {/each}
    {/each}
   </div>

  <style>
    .replies {
      padding-left: 30px;
    }
  </style>
</pre>
```
so the recursed sub-reply children are indented from their reply parents.

The structure code is
<pre>
src/routes/
  /blogList
    +page.svelte         - list blogs
    +page.server.svelte  - get blogs from the database
    +server.js           - delete a blog from list and server
  /blogForm - Post a new blog to the forum (see 'Definitions' below)
    +page.svelte - The form, or UI, to enter a blog
    +page.server.svelte
  /blogReplies - Post a reply
    +server.js - Post either a comment or a reply to a comment
  /userForm - Add a new user to the forum, ie, allow a user
              to post blogs, comments, and replies
  /loginForm - Allow an existing user to log in
</pre>
The database is MongoDB running on its default port, 27017,
using Mongoose as the interface.

MongoDB codes
 Schemas and Models are defined in src/api/mongo.js and schemas.js
 and the MongoDB connection is in src/hooks.server.js.
 The database name is prj23, and the collections are blogs and users.

To run this, download it, then run
  npm install
then
  npm run dev
from either a command line or a Visual Code terminal

This is a work in progress.

