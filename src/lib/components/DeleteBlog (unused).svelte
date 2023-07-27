<script>
  export let blog;
  import blogsStore  from "$stores/BlogsStore";  //  all blogs
  async function deleteBlog(blog, id) {
    //console.log('deleteBlog, id', id)
    try {   // "it (fetch) can make relative requests on the server"
      let res = await fetch(`/blogList?id=${id}`, {   method: 'DELETE' } )
      //console.log('deleteBlog, res', res)
      res = await res.json();
      //  if the blog is deleted in the db, delete it in the list
      if(res.message === 'deleted'){
        $blogsStore = $blogsStore.filter(item => item._id != blog._id)
      }
    } catch(error) {
      console.error('DeleteBlog catch error', error)
    }
  }

</script>

<button type='button' on:click={(()=>deleteBlog(blog, blog._id))}>Delete</button>

<style>
  button {
    cursor: pointer;
    color: red;
    border: red;
    background-color: white;
  }

</style>