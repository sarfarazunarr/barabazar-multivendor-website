import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Corders = () => {
  const token = localStorage.getItem('token');
  const [orderdata, setOrderdata] = useState([])
  useEffect(()=>{
    const getOrders = async() => {
      try{
        let response = await axios.get('http://localhost:8800/api/auth/orders', {
          headers:{
            'auth-token': token
          }
        });
        if(response.status === 200){
          setOrderdata(response.data.orders)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getOrders();
  }, [orderdata])
  const cancelOrder = async (e, orderId) => {
    e.preventDefault();
    try {
      let response = await axios.put(
        `http://localhost:8800/api/auth/cancelorder/${orderId}`,
        {},
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Order Cancelled!", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'light',
          autoClose: 2000
      })
      }
    } catch (error) {
      console.error(error);
      toast.error("Try Later some error occured!", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'light',
        autoClose: 2000
    })
    }
  };
  
    return (
    <>
      <section className='md:ml-72 p-10'>
        <h3 className='text-primary-900 text-3xl font-bold my-5'>All Orders</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary-700 ">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-3 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orderdata.map((order, index) => {
                return (

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.orderNumber}
                </th>
                <td className="px-6 py-4">
                {order.productName}
                </td>
                <td className="px-6 py-4">
                {order.quantity}
                </td>
                <td className="px-6 py-4">
                {order.totalAmount}
                </td>
                <td className="px-6 py-4">
                {order.paymentStatus}
                </td>
                <td className="px-6 py-4">
                {order.paymentType}
                </td>
                <td className="px-6 py-4">
                {order.status}
                </td>
                <td className="px-6 py-4">
                  <span onClick={(e) => cancelOrder(e, order._id)} className={`${order.status !== 'Pending' ? 'hidden' : 'block'} text-red-600 underline`}>Cencel Order</span>
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

export default Corders