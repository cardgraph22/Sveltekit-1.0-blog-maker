import { populateBlogs } from '$api/populateBlogs'
import { Blog } from "../../hooks.server";
//import mongoose from 'mongoose'
import { Schema } from "mongoose"
const blogSchema = new Schema({}, { strict: false });

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

  //  left off here - this (populateBlogs) actually works,
  //  but i need to get reply(ies?) from 'blogList' and post
  //  them to mongoose
  populateBlogs();
  return new Response(JSON.stringify({ message: "Some Message" }), { status: 200 })
}