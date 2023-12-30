import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Newproduct = () => {
  const [product, setProduct] = useState({
    productname: '',
    productdescription: '',
    productcategory: '',
    productprice: '',
    productspecification: '',
    producttags: '',
    productimage: '',
  });
  const token = localStorage.getItem('token');
  
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
  
    return axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: 'bfb6f93ce9f50109818090214c3ce99c', // Replace with your actual ImgBB API key
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  
  const newproduct = async (e) => {
    e.preventDefault();
  
    try {
      const imgbbResponse = await uploadImage(product.productimage);
  
      const updatedProduct = {
        ...product,
        productimage: imgbbResponse.data.data.url, // Use 'url' instead of 'url_viewer'
      };
  
      const response = await axios.post(
        'http://localhost:8800/api/auth/vendor/addproduct',
        updatedProduct,
        {
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        toast.success('Product Added Successfully!', {
          theme: 'light',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error uploading image or adding product:', error.message);
      toast.error('Some Error Occurred', {
        theme: 'light',
        position: 'top-center',
        hideProgressBar: false,
        autoClose: 2000,
      });
    }
  };
  

  const onchange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section class="py-1 md:ml-72">
        <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div class="rounded-t bg-white mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">
                  Add New Product
                </h6>
              </div>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={newproduct}>
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product Details
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="title">
                        Product Title
                      </label>
                      <input type="text" name='productname' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.productname} />
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="category">
                        Product Category
                      </label>
                      <input type="text" name='productcategory' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.productcategory} />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Product Price in Rs.
                      </label>
                      <input type="number" name='productprice' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.productprice} />
                    </div>
                  </div>
                </div>

                <hr class="mt-6 border-b-1 border-blueGray-300" />

                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product Details
                </h6>
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product Details
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Specification
                      </label>
                      <textarea type="text" name='productspecification' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.productspecification} rows="4"> </textarea>
                    </div>
                  </div>
                  <div class="w-full lg:w-12/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="description">
                        Description
                      </label>
                      <textarea type="text" name='productdescription' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.productdescription} rows="4"></textarea>
                    </div>
                  </div>
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="title">
                      Product Tags
                    </label>
                    <input type="text" name='producttags' class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={product.producttags} />
                  </div>

                  <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        onChange={(e) => setProduct({ ...product, productimage: e.target.files[0] })}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <button type='submit' className='w-full bg-primary-700 text-white text-center py-2 px-4 rounded-md'>Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Newproduct