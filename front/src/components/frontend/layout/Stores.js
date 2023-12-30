import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Stores = () => {
    const [store, setStore] = useState([]);
    useEffect(() => {
        const getstores = async () => {
            try {

                let response = await axios.get('http://localhost:8800/api/public/allvendors')
                if (response.status === 200) {
                    setStore(response.data.vendors);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getstores()
    }, [])
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Stores</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Here are the stores that are registered on BaraBazar</p>
                    </div>
                    <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {store.map((item, index) => {
                            return(
                        <div className="text-center text-gray-500 dark:text-gray-400" key={index}>
                            <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="https://img.icons8.com/bubbles/500/company.png" alt="Bonnie Avatar" />
                            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href={`store/${item.slug}`}>{item.businessName}</a>
                            </h3>
                            <p>{item.businessCategory}</p>
                            <p className='text-primary-800'></p>
                        </div>
                        )})}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Stores