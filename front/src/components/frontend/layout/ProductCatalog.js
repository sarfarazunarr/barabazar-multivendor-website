import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductCatalog = ({ title, description, number, category = false, catename }) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = category
              ? `http://localhost:8800/api/public/allproducts/${catename}`
              : 'http://localhost:8800/api/public/allproducts';
    
            const response = await axios.get(url);
            setProduct(response.data);
          } catch (error) {
            console.log(error.response.status);
          }
        };
    
        fetchData();
      }, [category, catename]);
    return (
        <>
            <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{title}</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">{description}</p>
                </div>
            </div>
            <section id='products' className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-14 mt-10 mb-5 p-10">
                {product.slice(0, number).map((item, index) => {
                    return (
                        <div className="w-64 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={index}>
                            <Link to={`/product/${item.slug}`}>
                                <img src={item.productimage}
                                    alt={item.productname} className="h-72 w-64 object-cover rounded-t-xl" />
                                <div className="px-4 py-3 w-64">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">{item.productcategory}</span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">{item.productname}</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black cursor-auto my-3">Rs.{item.productprice}</p>
                                        <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path
                                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}

            </section>
            
        </>
    )
}

export default ProductCatalog