import React from 'react'
import { Link } from 'react-router-dom'

const Features = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"><span className='text-primary-700'>Top Categories</span> of this month!</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here are the top categories of this month that makes high sells and gives a beautiful life to customers!</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="helo" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Women Clothes Collection</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/feature">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Men's Clothes Collection</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/home">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Kids Clothes Collection</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/home">Continue Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Smart Watches</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/category/Smartwatches">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Women Fashion</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Men's Fashion</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white text-center">Marriage Ceremony Collections</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/">Continue
                                Shopping</Link>
                        </div>
                    </div>
                    <div className='relative group transition duration-150'>
                        <img className="h-auto max-w-full rounded-lg cursor-pointer group-hover:opacity-25" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="feature" />
                        <div
                            className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-primary-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                            <h1 className="text-2xl text-white">Laptops</h1>
                            <Link className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" to="/">Continue
                                Shopping</Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        </section>

    )
}

export default Features