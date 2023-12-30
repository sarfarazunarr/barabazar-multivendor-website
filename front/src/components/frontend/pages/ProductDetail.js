import MainContext from '../../../contexts/Maincontext'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import ProductCatalog from '../../frontend/layout/ProductCatalog'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
    const slug = useParams();
    const token = localStorage.getItem('token')
    const [product, setProduct] = useState({})
    const [qty, setQty] = useState({ quantity: 1 })
    const { Loggedin, login } = useContext(MainContext)
    const [order, setOrder] = useState({
        vendor: '',
        product: '', 
        productName: '',
        quantity: '',
        address: '',
        paymentType: '',
        totalAmount: 0
    });
    
    const nav = useNavigate()
    useEffect(() => {
        const getProduct = async () => {
            await axios.get(`http://localhost:8800/api/public/product/${slug.id}`).then(res => { setProduct(res.data[0]) })
                .catch(error => console.log(error.response.status))
        };
        getProduct();
        Loggedin(token)
    }, [slug])
    const categoryvalue = product.productcategory;
    const placeOrder = async (e) => {
        e.preventDefault();
        let response = await axios.post('http://localhost:8800/api/auth/neworder', order, {
            headers: {
                'auth-token': token
            }
        })
        if (response.status === 200) {
            toast.success("Ordered Placed Successfully!", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'light',
                autoClose: 2000
            })
            setTimeout(()=>{
                nav('/dashboard/orders')
            })
        }
    }
    const buyNow = (e) => {
        e.preventDefault();
        if (!login) {
            let form = document.getElementById('order-modal');
            let formover = document.getElementById('order-overlay');
            form.classList.toggle('hidden')
            formover.classList.toggle('hidden')
        }
        else {
            nav('/account')
        }
    }
    const onchangeorder = async (e) => {
        const newOrder = {
            ...order,
            [e.target.name]: e.target.value,
            totalAmount: qty.quantity * product.productprice,
            quantity: qty.quantity,
            vendor: product.user,
            product: product._id,
            productName: product.productname
        };
        setOrder(newOrder);
    };
    

    return (
        <>
            <section className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={product.productimage} alt={product.productname} />
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mx-auto px-2">
                                    <button className="w-full bg-primary-900 text-white py-2 px-4 rounded-full font-bold hover:bg-primary-800 " onClick={(e) => buyNow(e)}>Buy Now</button>

                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-primary-800 dark:text-white mb-4">{product.productname}</h2>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 text-xl ">Price:</span>
                                    <span className="text-primary-600 text-xl font-semibold"> Rs.{product.productprice}</span>
                                </div>
                            </div>
                            <p className=" w-2/3 my-3 bg-primary-700 p-5 rounded-md text-white text-sm mb-4">
                                <h3 className='font-semibold text-xl mb-2'>Product Specification</h3>
                                {product.productspecification}
                            </p> 
                            
                            <div>
                                <span className="font-bold text-primary-700 ">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {product.productdescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProductCatalog title={"Related Products"} description={'Here are the products similar to this one!'} number={4} category={true} catename={categoryvalue} />



            <div id='order-overlay' className='hidden bg-gray-800 w-screen h-screen opacity-50 fixed top-0 right-0 left-0'></div>
            <div id="order-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center translate-x-1/3 ml-10 mt-4 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Place Order!
                            </h3>
                            <button type="button" onClick={(e) => buyNow(e)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div id='successmsg' className='mx-5 rounded-md text-primary-600 font-semibold text-sm text-center'></div>
                        <form className="p-4 md:p-5" onSubmit={placeOrder}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Product Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" value={product.productname} disabled />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required="" onChange={(e) => setQty({ quantity: e.target.value })} value={qty.quantity} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Price</label>
                                    <input type="number" name="totalAmount" id="totalprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" value={qty.quantity * product.productprice} disabled />
                                </div>
                                <div className="col-span-2">
                                    <label for="payment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Type</label>
                                    <select id="paymenttype" name='paymentType' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={onchangeorder} value={order.paymentType} >
                                        <option selected="">Select category</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="JazzCash">JazzCash</option>
                                        <option value="EasyPaisa">EasyPaisa</option>
                                        <option value="COD">Cash on Delivery</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complete Address</label>
                                    <textarea id="address" name='address' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Address..." onChange={onchangeorder} value={order.address}></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetail