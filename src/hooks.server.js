import mongoose from "mongoose"
import { startMongo } from "$api/mongo";
import { blogSchema, userSchema } from "$api/schemas";

startMongo().then(()=>{
  console.log('mongoose started')
})

export let Blog = mongoose.model('Blog', blogSchema)
export let User = mongoose.model('User', userSchema)

/*

Models are fancy constructors compiled from Schema definitions.
An instance of a model is called a document.

Models are responsible for creating and reading documents from
  the underlying MongoDB database.

from Mongoose documentation
https://mongoosejs.com/docs/models.html

*/