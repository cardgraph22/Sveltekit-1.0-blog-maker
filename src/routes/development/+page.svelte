
<script>
  import usersStore  from "$stores/UsersStore";  //  all users
  async function populateBlogs(){
    console.log('populate blogs')
    const res = await fetch('/blogList',
      {
        method: 'PUT',
      }
    )
  }
</script>

<p>Use 'populate blogs' to load some blogs to the server, hence, add to the list of blogs.
This way, you can play around with blog content or delete them without having to add new blogs yourself.</p>
<button class='btn' on:click={populateBlogs}>Populate Blogs</button>
<br>
<p>Similar functionality for 'populate users' is a future task.</p>
<br />
<table>
  <thead>
    <th>User Name</th>
    <th>Password</th>
    <th>Image</th>
  </thead>
  <tbody>
    {#each $usersStore as user}
      <tr>
        <td>{user.username}</td>
        <td>{user.password}</td>
        <td>{user.imagename}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  p {
    padding-top: 20px;
    padding-left: 10px;
  }
</style>