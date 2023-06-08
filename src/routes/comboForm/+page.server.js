//
//  comboForm.js
//  tis handles both login and new user
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
    .trim()
    //email: z.string().min(1).max(64).email()
    // email trims ie trim()  by default
  })

  const newUserSchema = z.object({
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
    confPwd: z
      .string( {required_error: 'Password is required'})
      .min( 3, { message: 'Password must be at least 3 characters'})
      .max(32, { message: 'Password must be less than 32 characters'})
      .trim(),
    //filename: z
    //  .string()  //
    }).superRefine(({confPwd, password}, ctx) => {
      if(confPwd !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password must match',
          path: ['password']
        })
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password must match',
          path: ['confPwd']
        })
      }
    })

export async function load({ params }) {
  console.log('comboForm server load')
  return { msg: 'comboForm load (data)' };
}

let msg = 'nothing set';
export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    //console.log('formData', formData)

    let username = formData.username;
    let password = formData.password;
    let newUser  = formData.newUser;

    //console.log('server, newUser, typeof newUser', newUser, typeof newUser)
    let file;
    if(newUser==='true'){
      let confPwd = formData.confPwd;
      file        = formData.imagename;
      console.log('!!! file 1', file)
      let filename  = file.name;
      console.log('confPwd', confPwd)
      console.log('file', file)
      console.log('filename', filename)
    }

    try {
      //  validation
      let result;
      if(newUser){
        result = newUserSchema.parse(formData);
        //console.log('server, newUser VALIDATION SUCCESS')
        console.log('!!! file 3', file)
      } else {
        result = loginSchema.parse(formData)
        //console.log('server, login VALIDATION SUCCESS')
      }
      console.log('server, validation SUCCESS, result', result)


      //  the validation passed, now do the actual database operation
      try{
        //  seek input username for login, or newUser
        console.log('server, try User.find')
        let result = await User.find({username: username, password: password}).exec();
        console.log('server, result of User.find', result)

        //  Check if adding new user
        if(newUser){
          //  Adding new user, check if user already exists
          console.log('server, newuser, result.length', result.length)
          if(result.length > 0){
            //  newUser, username already exists, isuue error to that effect
            console.log('server, newuser, user already exists', result)
            msg = 'newuser, user already exists'
            return [ {
              success: false,
              msg: msg,
              msg2: 'another',
              //msg3: JSON.parse(JSON.stringify(result))
            }];
          } else {
            //  file is defined above, but not here
            console.log('server, image', file)
            if (!(file instanceof Object) || !file.name) {
              return fail(400, { missing: true });
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(`./static/uploads/${file.name}`, buffer, "base64");
            //return { filename: file.name };
            console.log('server, add a new user', username, password, file.name)
            //  newUser, userame not found, add new user
            const user = new User({
              username : username,
              password : password,
              imagename: file.name
             //imagename: imagename,
             //imageblob: imageblob
            })
            result = await user.save();
            console.log('userForm, result of save', result)
            return { 
              success: true,
              msg: 'new user added',
              _id: result._id.toString(),
              username: username,
              imagename: file.name
            }
          }
        }  // end if(newUser)

        //  Login (not newUser)
        if(result.length > 0){
          //  login, username found, indicate success
          console.log('user exists, log in', result)
          msg = 'User Logged In'
          return  {
            success: true,
            msg: msg,
            _id: result[0]._id.toString(),
            username: result[0].username,
            imagename: result[0].imagename
          }
        } else {
          msg = 'login, user not found'
          return [ {
            success: false,
            msg: msg,
            msg2: 'another',
            //msg3: JSON.parse(JSON.stringify(result))
          }];
        }
      }  //  result = await User.find
      catch(err) {  //User.find() error
        //console.log('userForm, error', err)
        console.log('comboForm, User.find (network error?) error')
        console.log('err', err)
        return { msg: 'comboForm, error'}
      }
    }
    catch (err) {
      //  validation error

      //console.log('server, validation, ERROR', err)
      console.log('server, validation, ERROR', err)
      //console.log(err.flatten())
      const { fieldErrors: errors } = err.flatten()
      //  hunter said "we're going to rename that to errors"

      //  the following didnt work
      //  changed formData to FormDataObj and it did work
      //const { password, confPwd, ...rest } = formDataObj;
      //  but it still didnt work passing it back in the return
      //  might have to do with image object
      //  btw, where is image stored

      //  do i need formDataObj???
      //  or what comes back from zod?

      //console.log('rest', rest)
      //let ret = JSON.parse(JSON.stringify(rest))
      //console.log('ret', ret)
      //  source of confusionhunter is using the var 'data',
      //  which is the return of load

      return {
        //data: rest,
        //  Error: Data returned from action inside /comboForm
        //  is not serializable: Cannot stringify arbitrary
        //  non-POJOs (data..data.imagename)
        errors
      }
    }
  }      //  default: async ({ request }) => {
}        //  export const actions = {