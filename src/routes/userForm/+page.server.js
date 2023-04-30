import { User } from "../../hooks.server";
import { fail } from "@sveltejs/kit";
import fs from "fs";


/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  //const res = await fetch(`/api/items/${params.id}`);
  //const item = await res.json();
  return { msg: 'userform load (data)' };
}

let msg = 'nothing set';
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    //console.log('formData submitted', formData)
    let username  = formData.get('username')
    let password  = formData.get('password')
    let file = formData.get('image')
    console.log('server, image', file)

    if (!(file instanceof Object) || !file.name) {
      return fail(400, { missing: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`/uploads/${file.name}`, buffer, "base64");
    //return { filename: file.name };


    //let imagename = formData.get('imagename')
    //let imageblob = formData.get('imageblob')
    //const id = crypto.randomUUID()
    //const user = new User({
    //  username : username,
    //  password : password,
    //  image: buffer
    //  //imagename: imagename,
    //  //imageblob: imageblob
    //})
    //console.log('userForm, user', user)
    //const actualImage = formData.get(user.imagename?.valueOf() as File)

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
        console.log('add new user here')
        //  user doesnt already exist, add
        const user = new User({
         username : username,
         password : password,
         imagename: file.name
         //imagename: imagename,
         //imageblob: imageblob
        })
        result = await user.save();
        console.log('userForm, result of save', result)
        return { msg: 'new user added'}
      }
    }
    catch(err) {
      console.log('userForm, error', err)
      return { msg: 'userForm, error'}
    }
  }
}