import './App.css';
import { Header, Footer } from './components';
import { Home, Category, Marketplace, StoresPage, About, Contact, Account, ProductDetail, Blog, Pagenotfound, Dashboard, Corders, Cstores, Store, Cdashboard, Sellerform, Payment } from './components/pages';
import { Dashboard2, Newproduct, Products, Vdashboard, Vorders } from './components/dashboard/pages/vendor';
import Mainstate from './contexts/Mainstate'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Mainstate>
        <ToastContainer />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/category/:id' element={<Category />}></Route>
            <Route path='/Marketplace' element={<Marketplace />}></Route>
            <Route path='/stores' element={<StoresPage />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/post' element={<Blog />}></Route>
            <Route path='/store/:id' element={<Store />}></Route>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Cdashboard />} />
              <Route path="orders" element={<Corders />} />
              <Route path="verify-payment/:orderid" element={<Payment />} />
              <Route path="stores" element={<Cstores />} />
              <Route path="beseller" element={<Sellerform />} />
            </Route>
            <Route path='/vdashboard' element={<Dashboard2 />}>
              <Route index element={<Vdashboard />} />
              <Route path='newproduct' element={<Newproduct />} />
              <Route path='products' element={<Products />} />
              <Route path='orders' element={<Vorders />} />
            </Route>
            <Route path='/*' element={<Pagenotfound />}></Route>
          </Routes>
          <Footer />
        </Router>
      </Mainstate>
    </div>
  );
}

export default App;
