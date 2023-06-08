//
//  userForm.js
//
import { User } from "/src/hooks.server";
import { fail } from "@sveltejs/kit";
import fs from "fs";

import { z } from 'zod'
const loginSchema = z.object({
  username: z
    .string( {required_error: 'User name is required'})
    .min( 1, { message: 'User name must be at least one character'})
    .max(64, { message: 'User name must be less than 64 characters'})
    .trim(),
  password: z
    .string( {required_error: 'Password is required'})
    .min( 3, { message: 'Password must be at least 3 characters'})
    .max(32, { message: 'Password must be less than 32 characters'})
    .trim(),
    //email: z.string().min(1).max(64).email()
    // email trims ie trim()  by default
  confPwd: z
    .string( {required_error: 'Password is required'})
    .min( 3, { message: 'Password must be at least 3 characters'})
    .max(32, { message: 'Password must be less than 32 characters'})
    .trim()
  /*  imagename is a file
  imagename: z
    .string( {required_error: 'Image name is required'})
    .min( 1, { message: 'Image name must be at least one character'})
    .max(64, { message: 'Image name must be less than 64 characters'})
    .trim(),
  */
})

export async function load({ fetch, params }) {
  //const res = await fetch(`/api/items/${params.id}`);
  //const item = await res.json();
  console.log('userForm server load')
  return { msg: 'userform load (data)' };
}

let msg = 'nothing set';
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const formDataObj = Object.fromEntries(formData)
    //console.log('formData submitted', formData)
    let username  = formData.get('username')
    let password  = formData.get('password')
    let confPwd   = formData.get('confPwd')
    let file = formData.get('imagename')
    //console.log('server, image', file)

    //  !!! this may want to go after validation
    if (!(file instanceof Object) || !file.name) {
      return fail(400, { missing: true });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`./static/uploads/${file.name}`, buffer, "base64");
    //return { filename: file.name };

    try {
      //  validation
      const result = loginSchema.parse(formDataObj)
      console.log('SUCCESS')
      console.log(result)
      //  here, the validation passed, now to do the actual database operation
      try{
        let result = await User.find({username: username})
        if(result.length > 0){
          console.log('user already exists', result)
          msg = 'user already exists'
          return [ {
            success: true,
            msg: msg,
            msg2: 'another',
            //msg3: JSON.parse(JSON.stringify(result))
          }];
        } else {
          //console.log('add new user here')
          //  user doesnt already exist, add
          const user = new User({
           username : username,
           password : password,
           imagename: file.name
           //imagename: imagename,
           //imageblob: imageblob
          })
          result = await user.save();
          //console.log('userForm, result of save', result)
          return { msg: 'new user added'}
        }
      }
      catch(err) {
        console.log('userForm, error', err)
        return { msg: 'userForm, error'}
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