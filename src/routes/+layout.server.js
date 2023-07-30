//
//  layout - layout.server.js
//

import { User } from "/src/hooks.server";
export async function load() {
  let users = await(User.find())
  //  !!! use the following for production (do not return password)
  //users = JSON.parse(JSON.stringify(users,['_id', 'username', 'imagename']));
  users = JSON.parse(JSON.stringify(users));
  console.log('LOAD users in layout,server.js ')
  return {users};
}