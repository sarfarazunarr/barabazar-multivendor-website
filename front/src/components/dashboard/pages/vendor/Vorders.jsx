import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Vorders = () => {
  const token = localStorage.getItem('token');
  const [orderdata, setOrderdata] = useState([])
  const [order, setOrder] = useState([])
  const [user, setUser] = useState([])
  const [updatestatus, setUpdatestatus] = useState({
    status: ''
  })
  const [orderId, setOrderId] = useState()
  useEffect(() => {
    const getOrders = async () => {
      try {
        let response = await axios.get('http://localhost:8800/api/auth/vendor/allorder', {
          headers: {
            'auth-token': token
          }
        });
        if (response.status === 200) {
          setOrderdata(response.data.orderdata)

        }
      } catch (error) {
        console.log(error)
      }
    }
    getOrders();
  }, [orderdata])

  const update = (e, orderid) => {
    e.preventDefault();
    setOrderId(orderid)
    let update = document.getElementById('update-model');
    let overlay = document.getElementById('order-overlay');
    update.classList.toggle('hidden')
    overlay.classList.toggle('hidden')
  }
  const updateData = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.put(
        `http://localhost:8800/api/auth/vendor/orderstatus/${orderId}`,
        { status: updatestatus.status },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Status Updated", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'light',
          autoClose: 2000
      })
        update();
      };
    } catch (error) {
      toast.error("Some error occured!", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'light',
        autoClose: 2000
    })
    }
  };

  const view = async (e, orderid, userid, condition) => {
    e.preventDefault();
    let view = document.getElementById('view-model');
    let overlay = document.getElementById('order-overlay');
    if (condition === 'hide') {
      view.classList.add('hidden')
      overlay.classList.add('hidden')
    }

    else if (condition === 'show') {
      view.classList.remove('hidden')
      overlay.classList.remove('hidden')
      try {
        let response = await axios.get(
          `http://localhost:8800/api/auth/vendor/order/${orderid}`,
          {
            headers: {
              'auth-token': token,
            },
          }
        );
        if (response.status === 200) {
          setOrder(response.data.orderdata)
        };
      } catch (error) {
        console.log(error);
      }
      try {

        let response = await axios.get(`http://localhost:8800/api/auth/user/${userid}`, {
          headers: {
            'auth-token': token
          }
        });
        if (response.status === 200)
          setUser(response.data.userData);
      }
      catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <>
      <section className='md:ml-72 p-10'>
        <h3 className='text-primary-900 text-3xl font-bold my-5'>All Orders</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary-900 ">
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

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-900" key={index}>
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
                    <td className="px-6 py-4 capitalize">
                      {order.paymentStatus}
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentType}
                    </td>
                    <td className="px-6 py-4">
                      {order.status}
                    </td>
                    <td className="px-6 py-4">
                      <a href="/" className={`${order.status === 'Cancelled' ? 'hidden' : 'block'} mx-1 font-medium text-primary-600 hover:underline`} onClick={(e) => update(e, order._id)}>Update</a>
                      <a href="/" className="mx-1 font-medium text-primary-600 hover:underline" onClick={(e) => view(e, order._id, order.user, 'show')}>View</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      <div id='order-overlay' className='hidden bg-gray-800 w-screen h-screen opacity-50 fixed top-0 right-0 left-0'></div>
      <div id="update-model" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center translate-x-1/3 ml-10 mt-4 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Status
              </h3>
              <button type="button" onClick={(e) => update(e)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={(e) => updateData(e)}>
              <div className="col-span-2">
                <label for="payment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update Order status</label>
                <select
                  id="status"
                  name="status"
                  className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(e) => setUpdatestatus({ ...updatestatus, [e.target.name]: e.target.value })}
                  value={updatestatus.status}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Failed">Failed</option>
                  <option value="Delivery Failed">Delivery Failed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>

              </div>
              <button type="submit" className="text-white inline-flex items-center bg-primary-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-900 dark:focus:ring-primary-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Update Status
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id="view-model" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center translate-x-1/3 ml-10 mt-4 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order Details
              </h3>
              <button type="button" onClick={(e) => view(e, orderId, 'none', 'hide')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-5">
              <ul className='text-gray-600'>
                <li>Product Name: <span className='px-1 text-primary-900'>{order.productName}</span></li>
                <li>Purchaser Name: <span className='px-1 text-primary-900'>{user.name}</span></li>
                <li>Purchaser Email: <span className='px-1 text-primary-900'>{user.email}</span></li>
                <li>Purchaser Phone: <span className='px-1 text-primary-900'>{user.phone}</span></li>
                <li>Quantity: <span className='px-1 text-primary-900'>{order.quantity}</span></li>
                <li>Total Price: <span className='px-1 text-primary-900'>{order.totalAmount}</span></li>
                <li>Payment Type: <span className='px-1 text-primary-900'>{order.paymentType}</span></li>
                <li>Payment Status: <span className='px-1 text-primary-900'>{order.paymentStatus}</span></li>
                <li>Order Status: <span className='px-1 text-primary-900'>{order.status}</span></li>
                <li>Order Date: <span className='px-1 text-primary-900'>{order.orderDate}</span></li>
                <li>Address: <span className='px-1 text-primary-900'>{order.address}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vorders