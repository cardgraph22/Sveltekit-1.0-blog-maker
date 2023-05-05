import { populateBlogs } from '$api/populateBlogs'
import { Blog } from "../../hooks.server";
//import mongoose from 'mongoose'
import { Schema } from "mongoose"
const blogSchema = new Schema({}, { strict: false });
console.log('blogList, +server.js, (blog functions)')

export async function DELETE( { url } ){
  const id = url.searchParams.get('id')
  let resp = await Blog.deleteOne({_id:id})
  //console.log('delete blog, resp', resp.deletedCount)
  let msg;
  if(resp.deletedCount > 0){msg = 'deleted'} else {msg = 'error'}
  const response =  new Response(JSON.stringify( {message: msg }))
  return response

}
export async function PUT(){
  populateBlogs();
  return new Response(JSON.stringify({ message: "Some Message" }), { status: 200 })
}

export async function POST(){
  populateBlogs();
  return new Response(JSON.stringify({ message: "populateBlogs (POST in server.js)" }), { status: 200 })
}