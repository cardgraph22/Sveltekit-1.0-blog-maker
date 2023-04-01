import mongoose from "mongoose"
mongoose.set('strictQuery', false);

import { MONGO_URL } from '$env/static/private'

export async function startMongo() {
  console.log('in mongo.js')
  //mongoose.connect(MONGODB_URL)

  try {
    await mongoose.connect(MONGO_URL)
    console.log('connected to mongoose')
  } catch(e) {
    console.log(e)
  }
}