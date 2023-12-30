import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cstores = () => {
  const token = localStorage.getItem('token');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/auth/followedstores`, {
          headers: {
            'auth-token': token
          }
        });
        if (response.status === 200) {
          // Assuming the response.data is an object with a 'followed' property
          const followedStores = response.data.followed || [];
          setStores(followedStores);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <>
      <section className='md:ml-72 p-10'>
        <h3 className='text-primary-900 text-3xl font-bold my-5'>All Favorite Stores</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Store Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Visit Page
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((item, index) => {
                return (

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.businessName}
                    </th>
                    <td className="px-6 py-4">
                      {item.businessCategory}
                    </td>
                    <td className="px-6 py-4">
                      {item.city + ' ' + item.country}
                    </td>
                    <td className="px-6 py-4">
                      <a href={`/store/${item.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Visit</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
              <p className='py-2 text-center text-xl text-gray-400'>{stores.length  === 0 ? 'No any store is followed by you!' : ''}</p>
        </div>
      </section>
    </>
  )
}

export default Cstores