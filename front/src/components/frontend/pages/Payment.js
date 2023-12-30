import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
const Payment = () => {
    const orderid = useParams();
    const token = localStorage.getItem('token');
    const [payment, setPayment] = useState({
        payment_channel: '',
        referenceNumber: '',
        amount: 0,
        ordernumber: '',
        date: ''
    })

    const submitform = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:8800/api/auth/verifypayment', payment, {
                headers: {
                    'auth-token': token
                }
            });
            if (response.status === 200) {
                toast.success("Payment Details Sent", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
        } catch (error) {
            if (error.response.status === 404) {
                console.log('Order not found')
            }
            else {
                console.log(error)
            }
        }
    }

    const onchange = (e) => {
        e.preventDefault();
        setPayment({ ...payment, [e.target.name]: e.target.value, ordernumber: orderid.orderid })
    }
    return (
        <>
            <div className="min-h-screen ml-64 p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">Payment Verification</h2>
                        <p className="text-gray-500 mb-6">Verify Payments</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Payment Details</p>
                                    <p>Following are Payment Accounts</p>
                                    <ul>
                                        <li>Bank: PK920000000000000000</li>
                                        <li>Easypaisa: 923012345678</li>
                                        <li>JazzCash: 923012345678</li>
                                        <Link to="/dashboard/orders">Pay Later</Link>
                                    </ul>
                                </div>
                                <form onSubmit={submitform}>
                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="payment_channel">Payment Channel</label>
                                                <input type="text" name="payment_channel" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={onchange} value={payment.payment_channel} />
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="reference">Reference Number / Transaction Id</label>
                                                <input type="text" name="referenceNumber" id="referenceNumber" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="12252K3" onChange={onchange} value={payment.referenceNumber} />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="amount">Amount Paid</label>
                                                <input type="number" name="amount" id="amount" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={onchange} value={payment.amount} placeholder="" />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="city">Date</label>
                                                <input type="date" name="date" id="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={onchange} value={payment.date} placeholder="" />
                                            </div>

                                            <div className="md:col-span-5">
                                                <div className="inline-flex items-center">
                                                    <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                    <label htmlFor="billing_same" className="ml-2">The given information is valid and correct.</label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Payment