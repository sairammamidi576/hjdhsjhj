import React from 'react'
import "./footer.css"
import { fb, insta, logo, twitter } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis atque fugiat magni repellat officia molestias nostrum consectetur quia commodi perspiciatis!</p>
          <div className="footer-social-icons">
            <img src={fb} alt="" />
            <img src={insta} alt="" />
            <img src={twitter} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Tea Time - Balkonda</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91-9898989898</li>
            <li>teatimebalkonda@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; Tea Time Balkonda - All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
