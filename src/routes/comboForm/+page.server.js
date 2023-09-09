//
//  comboForm.js
//  tis handles both login and new user
//
import { User } from "/src/hooks.server";
import { fail } from "@sveltejs/kit";
import fs from "fs";
import { loginSchema, newUserSchema } from "../../api/zval.js";

//  nothing to load to client for comboForm
//export async function load({}) {
//  console.log('comboForm server load')
//  return { msg: 'comboForm load (data)' };
//}

let msg = 'nothing set';
export const actions = {
  default: async ({ request }) => {
    //  extract data from form
    const formData = Object.fromEntries(await request.formData());
    let username = formData.username;
    let password = formData.password;
    //  make newUser a boolean
    let newUser  = JSON.parse(formData.newUser);

    let file;
    if(newUser===true){
      file = formData.imagename;
    }

    try {
      //  validation
      let result;
      if(newUser){
        result = newUserSchema.parse(formData);
      } else {
        result = loginSchema.parse(formData)
      }

      //  the validation passed, now do the actual database operation
      try{
        //  seek input username for login, or newUser
        //console.log('server, try User.find')
        let result = await User.find({username: username, password: password}).exec();
        //console.log('server, result of User.find', result)

        //  Check if adding new user
        if(newUser){
          //  Adding new user, check if user already exists
          //console.log('server, newuser, result.length', result.length)
          if(result.length > 0){
            //  newUser, username already exists, isuue error to that effect
            //console.log('server, newuser, user already exists', result)
            return [ {
              success: false,
              msg: "User already exists",
            }];
          } else {
            //  file is defined above, but not here
            //console.log('server, image', file)
            if (!(file instanceof Object) || !file.name) {
              return fail(400, { missing: true });
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(`./static/uploads/${file.name}`, buffer, "base64");
            //return { filename: file.name };
            //console.log('server, add a new user', username, password, file.name)
            //  newUser, userame not found, add new user
            const user = new User({
              username : username,
              password : password,
              imagename: file.name
             //imagename: imagename,
             //imageblob: imageblob
            })
            result = await user.save();
            //console.log('userForm, result of save', result)
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
          //console.log('user exists, log in', result)
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