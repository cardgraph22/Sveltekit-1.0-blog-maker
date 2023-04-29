//
//  loginForm.js
//
import { User } from "../../hooks.server";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  //const res = await fetch(`/api/items/${params.id}`);
  //const item = await res.json();
  return { msg: 'loginform load (data)' };
}

let msg = 'nothing set';
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    //console.log('formData submitted', formData)
    let username  = formData.get('username')
    let password  = formData.get('password')
    try{
      let result = await User.find({username: username, password: password})
      if(result.length > 0){
        console.log('user exists, log in', result)
        msg = 'User Logged In'
        return  {
          success: true,
          msg: msg,
          _id: result[0]._id.toString(),
          username: result[0].username,
          imagename: result[0].imagename,
        };
      } else {
        msg = 'user not found'
        return [ {
          success: false,
          msg: msg,
          msg2: 'another',
          //msg3: JSON.parse(JSON.stringify(result))
        }];
      }
    }
    catch(err) {
      console.log('loginForm, error', err)
      return { msg: 'loginForm, error'}
    }
  }
}