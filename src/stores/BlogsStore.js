import { writable } from "svelte/store";
const blogsStore = writable();
//const blogsStore = writable(
//  {
//    _id         : '',
//    username    : '',
//    entry       : '',
//    replies     : [],


//  not added
//    blogLevel   : 0,
//    repliesLevel: 0
//  });
export default blogsStore;

// all blogs