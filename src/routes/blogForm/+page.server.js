//
//  blogForm - +page.server
//
import { Blog } from "/src/hooks.server";
  let blogs = []

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    //console.log('formData submitted', formData)
    let username = formData.get('username')
    let title = formData.get('title')
    let entry = formData.get('entry')
    //const id = crypto.randomUUID()
    if(username == '')username='anonymous'
    const blog = new Blog({
      username: username,
      title: title,
      entry: entry,
      replies: []
    })
    blogs.push(blog)
    blog.save()
    .then((result) => {
      //console.log('blogForm, page.server.js, save result', result)
      //res.send(result)
    })
    .catch((err) => {
      console.log('blogForm, page.server.js, err',err)
    })
  }
}