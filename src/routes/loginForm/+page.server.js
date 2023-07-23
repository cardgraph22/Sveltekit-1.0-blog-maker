//
//  loginForm.js
//
import { User } from "/src/hooks.server";
import { z } from 'zod'
const loginSchema = z.object({
  username: z
    .string( {required_error: 'Username is required'})
    .min( 1, { message: 'Username must be at least one character'})
    .max(64, { message: 'Username must be less than 64 characters'})
    .trim(),
  password: z
    .string( {required_error: 'Username is required'})
    .min( 3, { message: 'Password must be at least 3 characters'})
    .max(32, { message: 'Username must be less than 32 characters'})
    .trim()
    //email: z.string().min(1).max(64).email()
    // email trims ie trim()  by default
})

//  load doesn't really do anything for Login since i am not pre-loading form data
//  load 'returns' shows up as 'data' in the client
//    ie, in +page.svelte:    export let data;
export async function load({ fetch, params }) {
  //const res = await fetch(`/api/items/${params.id}`);
  //const item = await res.json();
  //console.log('login server load')
  return { msg: 'loginform load (data)' };
}

let msg = 'nothing set';
//  action 'return(s)' show up as 'form' in the client
//    ie, in +page.svelte:    export let form;
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const formDataObj = Object.fromEntries(formData)
    //console.log('formData submitted', formData)
    //console.log('formDataObj extracted', formDataObj)
    let username  = formData.get('username')
    let password  = formData.get('password')
    //console.log('server, extract username, password', username, password)

    //  note: zod wants 'extracted' formData, Object.fromEntries,
    //    whereas svelte formData.get wants doesn't

    //  hunter "doesn't point out" or account for
    //  this apparent difference

    try {
      //  validation
      const result = loginSchema.parse(formDataObj)
      //console.log('SUCCESS')
      //console.log(result)
      //  here, the validation passed, now to do the actual database operation
      try{
        let result = await User.find({username: username, password: password})
        if(result.length > 0){
          //console.log('user exists, log in', result)
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
    } catch (err) {
      console.log('ERROR', err)
      console.log(err.flatten())
      const { fieldErrors: errors } = err.flatten()
      //  hunter said "we're going to rename that to errors"

      //  the following didnt work
      const { password, ...rest } = formData;
      console.log('rest', rest)
      //let ret = JSON.parse(JSON.stringify(rest))
      //console.log('ret', ret)
      //  source of confusionhunter is using the var 'data',
      //  which is the return of load

      return {
        //data: formDataObj,
        errors
      }
    }
  }
}