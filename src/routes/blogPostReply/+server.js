import { Blog } from "../../hooks.server";
export const PUT = async({request})=>{
  const body = await request.json()
  let resp = await Blog.findByIdAndUpdate(
    {_id: body._id},
    {$set: {replies: body.replies}},
    {new: true})
      .then( result=> {
       //console.log('findByIdAndUpdate result', result);
       return result;
  });
  return new Response(JSON.stringify({ message: resp}), { status: 200 })
}