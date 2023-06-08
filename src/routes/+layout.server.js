//
//  layout - layout.server.js
//
import { Blog } from "/src/hooks.server";
import { User } from "/src/hooks.server";
export async function load() {
  let blogs = await(Blog.find())
  blogs = JSON.parse(JSON.stringify(blogs));
  //console.log('blogList, +page.server.js, blogs', blogs)
  let users = await(User.find())

  //  !!! use the following for production (do not reetuen password)
  //users = JSON.parse(JSON.stringify(users,['_id', 'username', 'imagename']));
  users = JSON.parse(JSON.stringify(users));
  return {
    blogs,
    users
  }
}