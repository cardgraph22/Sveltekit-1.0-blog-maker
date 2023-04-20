//
//  blogItem - page.server.js
//
//    return 1 blog and all users
//
import { Blog } from "/src/hooks.server";
import { User } from "/src/hooks.server";
export async function load({params}){
  //console.log('blogItem, +page.server.js, params', params)
  let id = params._id;
  let blog = await(Blog.find({_id: id}));
  blog = JSON.parse(JSON.stringify(blog));
  //console.log('blogItem, +page.server.js, blog', blog)
  let users = await(User.find())
  users = JSON.parse(JSON.stringify(users));
  return {
    blog,
    users
  }
}


/*

import { Blog } from "/src/hooks.server";
export async function load({params}){
  console.log('params', params)
  let id = params._id;
  let blog = await(Blog.find({_id: id}))
  console.log('blogItem server, blog', blog)
  blog = JSON.parse(JSON.stringify(blog));
  console.log('blog from page.server.js', blog)
  return {
    blog
  }
}

*/