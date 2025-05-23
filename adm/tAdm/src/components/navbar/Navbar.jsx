import React from 'react'
import "./Navbar.css"
import { logo, profile } from '../../assets/asset'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img className='logo-img' src={logo}/>
        <p>Balkonda</p>
      </div>
      {/* <img className='profile' src={profile} alt="profile logo" /> */}
      <button onClick={()=>setToken("")}>Logout</button>
    </div>
  )
}

export default Navbar
