import React from 'react'
import {Hero} from '../layout/Hero'

const Blog = () => {
    let tags = ["Hello", "new post", 'newworld']
  return (
    <>
        <Hero title={"Blog Title"} description={"This blog is amazing posted on 12/12/2023"} />
        <section id='blog-post' className='px-40 py-20 text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque adipisci dolore earum accusamus perferendis veniam rerum quibusdam iusto quaerat dignissimos, rem inventore quae amet nemo. Facilis commodi quo beatae tempore repellendus, distinctio, velit ratione, officiis magnam cum vero quas dolor illo rerum! Recusandae id dolor doloremque, ad voluptatem, culpa, ab delectus deserunt sit temporibus deleniti. Veritatis iure facilis, id blanditiis cupiditate distinctio optio quasi ut voluptates, deserunt enim, animi dolorum omnis voluptatibus deleniti veniam aliquid voluptatem. Error necessitatibus est cum culpa laboriosam facere, nulla beatae, architecto dolores, velit in! Rerum velit minus dolorem consectetur delectus eligendi, facilis facere ad harum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sed corrupti minima reiciendis assumenda enim laudantium illum tempore asperiores vero, quos, officiis, voluptatibus consequuntur minus sapiente quisquam aspernatur ad quo. Delectus praesentium facere nemo ex officia. Facere quos minima eligendi dolor! Quod neque nostrum eius incidunt iure est odio, alias corporis sed ex maiores atque blanditiis dolorum provident impedit similique aliquam id libero voluptatum aperiam quo perspiciatis nam voluptatibus. Quos delectus eos veritatis minima quod voluptates magni dolorum ipsa fuga libero debitis nam, laboriosam, eaque molestias quis ab ullam aspernatur maxime atque voluptatum animi! Adipisci assumenda, consequatur perspiciatis fugiat error atque blanditiis sunt amet delectus, repellat vel rerum nostrum impedit molestias, sit eaque officia minima cupiditate minus dolorum numquam expedita accusamus. At eius, nisi, quo aperiam architecto enim sapiente illo, magnam quam hic impedit ullam iusto incidunt tenetur quaerat. Iure, quae earum. Consectetur quasi animi, sapiente modi laudantium, ipsa magnam possimus, alias quod assumenda optio qui voluptate dolore. Laboriosam sit facilis explicabo architecto, in amet esse quod nostrum nam accusantium, aliquam eligendi voluptatibus doloribus harum aperiam recusandae? Provident commodi itaque voluptate excepturi ut. Obcaecati cum ipsam dolorem deleniti voluptatem facere ex vel eveniet ipsa est! Dicta officiis in harum deserunt.
            <div id="meta" className='my-5'>
                <p className='text-sm my-2 text-gray-300'>Tags:</p>
                {tags.map((tag, index)=>{
                    return (
                        <span key={index} className='bg-primary-200 mx-1 p-1 cursor-pointer hover:bg-primary-800 hover:text-white rounded-md text-primary-800 font-semibold text-sm'>{tag}</span>
                    )
                })}
            </div>
            <div id="author" className='w-96 p-2 my-10 bg-primary-600 rounded-md flex align-middle justify-start'>
                <img src="https://lh3.googleusercontent.com/a/AEdFTp70cvwI5eevfcr4LonOEX5gB2rzx7JnudOcnYbS1qU=s96-c" alt="user" className='w-14 h-14 rounded-full' />
                <div>
                <h5 className='text-white font-semibold mx-3 mt-2'>Sarfaraz Unar</h5>
                <p className='text-xs text-white px-3'>Sarfaraz Unar is a developer and CEO of Faraz Web Link and BaraBazar</p>
                </div>
            </div>
        </section>
        
    </>
  )
}

export default Blog