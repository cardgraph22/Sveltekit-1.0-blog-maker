//
//  layout - layout.server.js
//
import { Blog } from "../hooks.server";
import { User } from "../hooks.server";
export async function load() {
  let blogs = await(Blog.find())
  blogs = JSON.parse(JSON.stringify(blogs));
  //console.log('blogList, +page.server.js, blogs', blogs)
  let users = await(User.find())
  users = JSON.parse(JSON.stringify(users,['_id', 'username', 'imagename']));
  return {
    blogs,
    users
  }
}