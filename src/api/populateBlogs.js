import { Blog } from "../hooks.server";
export function populateBlogs() {
  //console.log('---populate blogs---')
  let blogs = [
    {
      username: 'adam',
      title: 'How to make a blog entry',
      entry: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptas, fugiat, harum laudantium odit suscipit quaerat aspernatur deleniti adipisci tenetur voluptate molestias porro exercitationem! Enim necessitatibus rem doloremque aperiam ipsam?',
  
      replies: [
        {
          username: 'betty',
          entry: 'reply11',
          replies: [
            {
              username: 'charlie', entry: 'nested reply12',
              replies: [
                {
                  username: 'angel', entry: 'nested reply13',
                  replies: []
                }
              ]
            }
         ]
        }
      ]
    },
    {
      username: 'betty',
      title: 'blog2 title',
      entry: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
       Amet, accusamus aspernatur voluptatibus iusto maxime cum. Nesciunt
       nulla molestias enim soluta provident animi voluptas quibusdam odit
       sed earum. Minus, reprehenderit ipsam!`,
      replies: []
    }
  ]
  for(let i=0; i<blogs.length; i++){
    const blog = new Blog({
      username: blogs[i].username,
      title: blogs[i].title,
      entry: blogs[i].entry,
      replies: blogs[i].replies
    })
    blog.save()
    //.then((result)=>{
    //})
  }
  return blogs;
}

//export default populateBlogs;

 /*
  let blog2 = {
    username: 'b',
    title: 'blog2 title',
    entry: 'entry2',
    replies: []
  }

  let blog3 = {
    username: 'c',
    title: 'blog3 title',
    entry: 'entry3',
    replies: []
  }
  let blog4 = {
    username: 'd',
    title: 'blog4 title',
    entry: 'entry1',
    replies: []
  }
  let blog5 = {
    username: 'e',
    title: 'blog5 title',
    entry: 'entry5',
    replies: []
  }
  */