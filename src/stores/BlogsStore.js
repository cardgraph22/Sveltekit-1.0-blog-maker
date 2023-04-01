import { writable } from "svelte/store";
const blogsStore = writable();
//const blogsStore = writable(
//  {
//    user        : '',
//    _id         : '',
//    entry       : '',
//    replies     : [],
//    blogLevel   : 0,
//    repliesLevel: 0
//  });
export default blogsStore;

// all blogs