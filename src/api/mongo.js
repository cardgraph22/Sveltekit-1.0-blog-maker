import mongoose from "mongoose"
mongoose.set('strictQuery', false);

import { MONGODB_URI } from '$env/static/private'

export async function startMongo() {
  console.log('in mongo.js')
  //mongoose.connect(MONGODB_URL)

  try {
    await mongoose.connect(MONGODB_URI)
    //console.log('connected to mongoose')
  } catch(e) {
    console.log(e)
  }
}