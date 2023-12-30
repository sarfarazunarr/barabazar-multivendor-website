import React, { useEffect, useState, useContext } from 'react'
import { Hero } from '../layout/Hero'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Maincontext from '../../../contexts/Maincontext';

const Store = () => {
    const slug = useParams();
    const { Loggedin, login, user, getUser } = useContext(Maincontext)
    const [storedata, setStoredata] = useState({})
    const [product, setProduct] = useState([])
    useEffect(() => {
        const getdata = async () => {
            try {
                let response = await axios.get(`http://localhost:8800/api/public/vendor/${slug.id}`);
                if (response.status === 200) {
                    setStoredata(response.data.vendors[0])

                    try {
                        let id = response.data.vendors[0].user
                        let products = await axios.get(`http://localhost:8800/api/public/vendorcategory/${id}`)
                        if (products.status === 200) {
                            setProduct(products.data.products)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getdata()
        Loggedin()
        if (!login) { getUser(); }
    }, [slug])

    const isFollower = Array.isArray(storedata.followers) && storedata.followers.includes(user._id);

    console.log(isFollower)
    const follow = async (e, id) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let btn = document.getElementById('follow');
        if (token === null) btn.style.display = 'none'
        try {
            let response = await axios.put(`http://localhost:8800/api/auth/followvendor/${id}`, {}, { headers: { 'auth-token': token } });
            if (response.status === 200) {
                btn.innerHTML = 'Done!'
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Hero title={storedata.businessName} />
            <div className='flex p-5 m-5'>
                <div className="products w-3/4 border-r border-gray-200">
                    <h3 className='text-primary-700 py-2 font-bold text-3xl'>Products By Store</h3>
                    <hr className='border-primary-500 w-1/5 border' />
                    <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-14 mt-10 mb-5 p-10'>
                        {product.map((item, index) => {
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
                    </div>
                </div>
                <div className="info w-1/4 bg-primary-700 h-min text-white mx-1 p-5 rounded-md">
                    <h5 className='py-2 text-xl text-white font-semibold'>Business Details</h5>
                    <ul className='pl-2'>
                        <li>Name:  <span>{storedata.businessName}</span></li>
                        <li>Category:  <span>{storedata.businessCategory}</span></li>
                        <li>Website:  <a href={storedata.businessurl}>{storedata.businessurl}</a></li>
                        <li>FB Url:  <a href={storedata.fburl}>{storedata.fburl}</a></li>
                        <li>Adderss:  <span>{storedata.address + " " + storedata.city + " " + storedata.zipcode + " " + storedata.country}</span></li>
                        <li>Store <a href={storedata.slug}>{storedata.slug}</a></li>
                    </ul>
                    <button id='follow' className={`${login ? '' : 'disabled'} bg-white w-3/4 mx-6 my-2 border border-primary-700  rounded-md text-primary-700 font-semibold px-3 py-1 hover:bg-primary-800 hover:text-white`} onClick={(e) => follow(e, storedata._id)}>{isFollower ? 'Unfollow' : 'Follow'}</button>
                </div>
            </div>
        </>
    )
}

export default Store