//
//  blogList - page.server.js
//

import { Blog } from "/src/hooks.server";

export async function load() {
  let blogs = await(Blog.find())
  blogs = JSON.parse(JSON.stringify(blogs));
  console.log('LOAD blogList')
  //console.log('blogList, +page.server.js, blogs', blogs)
  return {blogs};
}