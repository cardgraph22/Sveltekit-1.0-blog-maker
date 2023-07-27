//
//  blogList/[_id] - page.server.js
//
//    return 1 blog and all users
//
import { Blog } from "/src/hooks.server";
import { User } from "/src/hooks.server";

/** @type {import('./$types').Actions} */
export const actions = {
  comment: async ({request}) => {
    const data = await request.formData();
    //console.log('data', data)
    let b = data.get('blog');
    let blog = JSON.parse(b).blog;
    let username = data.get('LIusername');
    let entryText = data.get('entryText');
    //console.log('page.server, comment', entryText)
    let reply = {
      username: username,
      entry: entryText,
      replies: [],  // initial comment/reply
      date: Date()
    }
    blog.replies.push(reply);
    let resp = await Blog.findByIdAndUpdate(
      {_id: blog._id},
      {$set: {replies: blog.replies}},
      {new: true})
        .then( result=> {
          //console.log('result', result)
          blog = result;
         return blog;
    });
    return (JSON.stringify({ message: resp}), { status: 200 })
  },
  reply: async({request}) => {
    const data = await request.formData();
    //console.log('page.server, reply', data)
    let b = data.get('blog');
    let blog = JSON.parse(b).blog;  //blog is inside b
    //console.log('server side blog', blog)

    let resp = await Blog.findByIdAndUpdate(
      {_id: blog._id},
      {$set: {replies: blog.replies}},
      {new: true})
        .then( result=> {
         return result;
    });
    return (JSON.stringify({ message: resp}), { status: 200 })
  }
};

export async function load({ params }){
  //console.log('blogItem, +page.server.js, params', params)
  let id = params._id;
  let blog = await(Blog.find({_id: id}));
  blog = JSON.parse(JSON.stringify(blog));
  //console.log('LOAD blogItem, +page.server.js, blog', blog)
  //console.log('LOAD blogItem, +page.server.js')
  let users = await(User.find())
  users = JSON.parse(JSON.stringify(users));
  return {
    blog,
    users
  }
}
