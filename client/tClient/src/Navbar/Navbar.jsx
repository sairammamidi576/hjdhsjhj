import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { cart, logo, profile } from "../assets/assets"
import {Link, useNavigate} from "react-router-dom"
import { StoreContext } from '../context/StoreContex'

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken('');
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to="/" className="logo">
        <img src={logo} className='logo-img' alt="" />
        <p>Balkonda</p>
      </Link>
      <ul className='nav-menu'>
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#mobile-app' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
        <a href='#contact us' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</a>
      </ul>
      <div className="nav-right">
        <div className="search">
          <Link to="/cart"><img src={cart} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>: <div className='nav-profile'>
            <img src={profile} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myOrders")}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar
