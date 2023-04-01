import { Schema } from "mongoose"

export const blogSchema = new Schema({
  username: String,
  title: String,
  entry: String,
  replies: []
});

export const userSchema = new Schema({
  username: String,
  password: String,
  imagename: String
});