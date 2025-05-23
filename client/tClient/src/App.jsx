import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/Place Order/PlaceOrder'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Verify from './Pages/verify/Verify'
import MyOrders from './Pages/my orders/MyOrders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myOrders' element={<MyOrders/>} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App