import { writable } from "svelte/store";
const userStore = writable(
  {
    _id: '',
    username: '',
    password: '',
    image:  ''
  });
export default userStore;

//  This is the currently logged in user