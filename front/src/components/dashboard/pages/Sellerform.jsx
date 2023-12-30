import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Sellerform = () => {
    const token = localStorage.getItem('token');
    const [seller, setSeller] = useState({
        businessName: '',
        businessCategory: '',
        businessurl: "",
        fburl: "",
        address: '',
        city: '',
        country: '',
        zipcode: '',
        description: ''
    });
    const beSeller = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/api/auth/vendor/beseller', seller, {
                headers: {
                    "auth-token": token
                }
            });
            if (response.status === 200) {
                toast.success("Form Registered Successfully! Wait for Confirmation from BaraBazar",{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
        } catch (error) {
            if(error.response.status === 400){
                toast.warn('You have already registered a business!');
            }
            else{
                toast.error('Some Error Occured');
            }
        }
    }
    const onchange = (e) => {
        setSeller({ ...seller, [e.target.name]: e.target.value });
    }
    return (
        <>
            <section className="py-1 md:ml-72">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">
                                    Enter Information About Your Business!
                                </h6>
                                
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={beSeller}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Business Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="business-name">
                                                Business Name
                                            </label>
                                            <input required type="text" name='businessName' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.businessName} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="category">
                                                Business Category
                                            </label>
                                            <input required type="text" name='businessCategory' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.businessCategory} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="website_link">
                                                Website Link
                                            </label>
                                            <input type="url" name='businessurl' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.businessurl} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="fblink">
                                                Facebook Page Link
                                            </label>
                                            <input type="url" name='fburl' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.fburl} />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Contact Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="address">
                                                Address
                                            </label>
                                            <input required type="text" name='address' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.address} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="city">
                                                City
                                            </label>
                                            <input required type="text" name='city' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.city} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                Country
                                            </label>
                                            <input required type="text" name='country' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.country} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                Postal Code
                                            </label>
                                            <input required type="text" name='zipcode' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={onchange} value={seller.zipcode} />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    About Business
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="aboutbusiness">
                                                About Business
                                            </label>
                                            <textarea name='description' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" onChange={onchange} value={seller.description}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='block rounded-md bg-primary-700 text-white font-bold text-md p-2'>Save Record</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sellerform