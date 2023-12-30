import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
const token = localStorage.getItem('token');
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/auth/vendor/allproducts', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products)
  
  return (
    <>
      <section className='md:ml-72 p-10'>
        <h3 className='text-primary-900 text-3xl font-bold my-5'>All Products</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return(
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.productname}
                </th>
                <td className="px-6 py-4">
                  {product.productcategory}
                </td>
                <td className="px-6 py-4">
                  {product.productprice}
                </td>
                <td className="px-6 py-4">
                  48
                </td>
                <td className="px-6 py-4">
                <img className='w-20 h-20' src={product.productimage} alt={product.productname} />
                </td>
                <td className="px-6 py-4">
                  <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                  <Link to={`/product/${product.slug}`} className=" mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                </td>
              </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Products