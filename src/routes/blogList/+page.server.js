//
//  blogList - page.server
//
import { Blog } from "../../hooks.server";
import { User } from "../../hooks.server";
export async function load() {
  let blogs = await(Blog.find())
  blogs = JSON.parse(JSON.stringify(blogs));
  //console.log('blogs from page.server.js', blogs)
  let users = await(User.find())
  users = JSON.parse(JSON.stringify(users));
  return {
    blogs,
    users
  }
}