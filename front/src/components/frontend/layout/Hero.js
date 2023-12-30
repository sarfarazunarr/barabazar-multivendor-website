import React from 'react'

export const Hero = ({title, description}) => {
  return (
    <section className="bg-primary-600 py-12">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">{title}</h1>
        <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{description}</p>
    </div>
</section>
  )
}
