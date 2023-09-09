export function handleImageUpload(e) {
  let imageblob, uploadedImage;
  const imagename = e.target.files[0]
  if(!imagename)return;
  uploadedImage = URL.createObjectURL(imagename);
  console.log('upLoadedImage', uploadedImage)
  const reader = new FileReader()
  reader.addEventListener('load', function(){
    console.log('load image')
    imageblob=reader.result
    //console.log('reader result', reader.result)
    //console.log('imageblob', imageblob)
  })
  if(imagename){
    console.log('read image')
    reader.readAsDataURL(imagename)
  }
  return [imageblob, uploadedImage];
}