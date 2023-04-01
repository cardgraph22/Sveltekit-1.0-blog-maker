import { User } from "../hooks.server";
export function populateusers() {
  //console.log('---populate users---')
  let users = [
    {
      username: 'betty',
      password: 'pwd',
      imagename: 'girl.jpg'
    }

  ]
  for(let i=0; i<users.length; i++){
    const user = new User({
      username: users[i].username,
      password: users[i].password,
      imagename: users[i].imagename,
    })
    user.save()
    //.then((result)=>{
    //})
  }
  return users;
}