import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Maincontext from '../../../contexts/Maincontext';

const Sidebar = () => {
    const { getUser, user, Loggedin, login } = useContext(Maincontext);
    const token = localStorage.getItem('token');
    const nav = useNavigate();
    useEffect(()=>{
        Loggedin(token);
        if(login) nav('/account#login')
        getUser();
    }, [Loggedin, getUser]);
    let location = useLocation();
    let menuItems = [
        {
            text: 'Dashboard',
            link: '/dashboard',
        },
        {
            text: 'Orders',
            link: '/dashboard/orders',
        },
        {
            text: 'Favorite Stores',
            link: '/dashboard/stores',
        },
        {
            text: 'Logout',
            link: '/dashboard/logout',
        }
    ]
    return (
        <>

            <button data-drawer-target="customer-sidebar" data-drawer-toggle="customer-sidebar" aria-controls="customer-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
            </button>

            <aside id="customer-sidebar" class="fixed top-18 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 rounded-md" aria-label="Sidebar">
                
                <div class="h-full px-3 py-4 rounded-tr-md overflow-y-auto bg-primary-800">
                <h3 className='text-center py-10 text-2xl font-semibold text-white'>{user.name}</h3>
                    <ul class="space-y-2 font-medium">
                        {menuItems.map((menu, index) => {
                            return (<li key={index}>
                                <Link to={menu.link} class={`${location.pathname === menu.link ? 'bg-primary-950' : 'bg-transparent'} flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-primary-800 duration-150 group`}>
                                    <span class="ms-3">{menu.text}</span>
                                </Link>
                            </li>);
                        })}
                    </ul>
                <Link to={`${user.account_type === 'customer' ? "beseller" : '/vdashboard'}`}> <button className={`my-5 mx-5 py-3 px-12 text-white bg-gradient-to-r to-orange-500 from-yellow-500 text-xl font-semibold rounded-md hover:bg-gradient-to-bl transition-all duration-200`}>Be Seller!</button></Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar