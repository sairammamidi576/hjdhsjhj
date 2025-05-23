import React from 'react'
import "./Sidebar.css"
import { NavLink } from "react-router-dom"
import { add, list, orders } from '../../assets/asset'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
            <img src={add} alt="add image" />
            <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
            <img src={list} alt="list image" />
            <p>Item List</p>
        </NavLink>
        <NavLink to="/update/:id" className="sidebar-option">
            <img src="Update.png" alt="update image" />
            <p>Update</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
            <img src={orders} alt="Order image" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
