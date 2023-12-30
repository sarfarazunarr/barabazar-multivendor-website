import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Account = () => {

    const nav = useNavigate();
    
    const [credentials, setCredentials] = useState({name: "", email: "", phone: "", password:""})
    const [logincredentials, setLogincredentials] = useState({email: "", password:""})

    const signup = async (e) => {
        const msg = document.querySelector('#smessage');
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8800/api/auth/signup', credentials);
            if(response.status === 200){
                localStorage.setItem('token', response.data);
                toast.success("Registered Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
                nav('/dashboard');
            } 

        }catch(err){
            if(err.code === 11000){
                toast.error("Registere with different Email", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
            else if(err.response.status === 400){
                toast.warn("User already exist", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
            else{
                toast.error("Registration Failed", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
        }
    }
    // Getting value from input tags
    const onchangesignup = (e) => {
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    // Login Func to compare data with database
    const login = async (e) => {
        e.preventDefault();
        const msg = document.querySelector('#lmessage');
        try{
            const response = await axios.post('http://localhost:8800/api/auth/login', logincredentials);
            if(response.status === 200){
                localStorage.setItem('token', response.data);
                toast.success("Logged in Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
                setTimeout(()=>{
                    nav('/dashboard');
                }, 3000)
                
            } 
        }catch(err){
            if(err.response.status === 400){
                toast.error("User not found", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
            else if(err.response.status === 401){
                toast.error("Invalid credentials!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
            else{
                toast.error("Login Failed Please try later!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'light',
                    autoClose: 2000
                })
            }
        }
    }
    // Getting Login Values from Inputs
    const onchangelogin = (e) => {
        e.preventDefault();
        setLogincredentials({...logincredentials, [e.target.name]: e.target.value})
    }
    // Getting Value from link after #
    let userlink = window.location.hash.substring(1);

    // Function to toggle between login and signup form
    function change() {
        let signup = document.getElementById('signup');
        let login = document.getElementById('login');
        let checksignup = signup.classList.contains('flex')
        let checklogin = login.classList.contains('flex');
        if (checksignup) {
            login.classList.replace('hidden', 'flex');
            signup.classList.replace('flex', 'hidden');
        }
        else if (checklogin) {
            login.classList.replace('flex', 'hidden');
            signup.classList.replace('hidden', 'flex');
        }
    }
    // UseEffect function to show form based on link
    useEffect(() => {
        let signup = document.getElementById('signup');
        let login = document.getElementById('login');
        if (userlink === 'login') {
            login.classList.replace('hidden', 'flex');
            signup.classList.replace('flex', 'hidden');
        }
        else if (userlink === 'signup') {
            login.classList.replace('flex', 'hidden');
            signup.classList.replace('hidden', 'flex');
        }
    }, [userlink]);


    return (
        <>
            <div id='signup' className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://i.ibb.co/tbBNSW2/shopping-cart-2030.png" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome! Create Account Now!</h2>
                </div>
                {/* Signup Function */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={signup} method="POST">
                        <div>
                            <label TextFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                            <div>
                                <input id="singupname" name="name" type="text" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangesignup} value={credentials.name} />
                            </div>
                        </div>
                        <div>
                            <label TextFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div >
                                <input id="signupemail" name="email" type="email" autoComplete="email" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangesignup} value={credentials.email} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label TextFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            </div>
                            <div >
                                <input id="phone" name="phone" type="text"  required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangesignup} value={credentials.phone} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label TextFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div >
                                <input id="signuppassword" name="password" type="password" autoComplete="current-password" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangesignup} value={credentials.password} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Create Account</button>
                        </div>
                    </form>
                    <p id='smessage' className='text-md mt-2 text-center'></p>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already Registered?
                        <span onClick={change} className="font-semibold leading-6 text-primary-600 hover:text-primary-500 cursor-pointer"> Login Now</span>
                    </p>
                </div>
            </div>

            {/* Login Function */}
            <div id='login' className="hidden min-h-full flex-col justify-center px-6 py-8 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://i.ibb.co/tbBNSW2/shopping-cart-2030.png" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome Back! Login Now</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={login} method="POST">

                        <div>
                            <label TextFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div >
                                <input id="loginemail" name="email" type="email" autoComplete="email" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangelogin} value={logincredentials.email} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label TextFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div >
                                <input id="loginpassword" name="password" type="password" autoComplete="current-password" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-primary-600 sm:text-sm sm:leading-6" onChange={onchangelogin} value={logincredentials.password} />
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Login Now</button>
                        </div>
                    </form>
                    <p id='lmessage' className='text-md mt-2 text-center'></p>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        New Here?
                        <span onClick={change} className="font-semibold leading-6 text-primary-600 hover:text-primary-500 cursor-pointer"> Create Account</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Account