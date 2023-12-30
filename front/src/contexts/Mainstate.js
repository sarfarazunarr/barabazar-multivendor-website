import React from "react";
import Maincontext from "./Maincontext";
import { useState } from "react";
import axios from 'axios';

const Mainstate = ({ children }) => {
    // Getting User's token
    const token = localStorage.getItem('token');

    // State Section
    const [user, setUser] = useState({});
    const [login, setLogin] = useState();
    const [products, setProducts] = useState([]);
    const Loggedin = (token) => {
        if (token !== null) {
            setLogin(false)
        }
        else {
            setLogin(true)
        }
    }
    const getUser = async () => {
        await axios.get(`http://localhost:8800/api/auth/getData`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            }).then(res => { setUser(res.data) })
            .catch(error => setUser(error.response.status))
    };
    const getProduct = async () => {
        try {
          const res = await axios.get('http://localhost:8800/api/auth/vendor/allproducts', {
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          });
          setProducts(res.data);
        } catch (error) {
          console.error(error);
        }
      };

// Don't include function below this
return (
    <Maincontext.Provider value={{ user, getUser, Loggedin, login, getProduct, products }}>{children}</Maincontext.Provider>
)}
export default Mainstate;