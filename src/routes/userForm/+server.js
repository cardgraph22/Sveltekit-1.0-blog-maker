
export const PUT = async({request})=>{
  console.log('made it to userform put')

  //  left off here - trying to read image (blob)



  //upload.single('myFile')
  return new Response(JSON.stringify({ message: 'server, try formidable'}), { status: 200 })
}