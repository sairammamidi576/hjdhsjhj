import React, { useEffect, useState } from 'react'
import "./All Orders.css"
import {toast} from "react-toastify"
import axios from 'axios';

const AllOrders = ({url,token}) => {
    const [orders,setOrders] = useState([]);
    const fetchAllOrders = async() =>{
        if(!token){
            return null;
        }
        try {
            const response = await axios.post(url+"/order/list",{},{headers:{token}})
            if(response.data.success){
                setOrders(response.data.data);
            }
        } catch (error) {
            toast.error("Error")
        }
    }
    const statusHandler = async(event,orderId) =>{
      try {
        const response = await axios.post(url+"/order/status",{orderId,status:event.target.value},{headers:{token}})
        if(response.data.success){
          await fetchAllOrders()
        }
      } catch (error) {
        console.error(error);
        toast.error(response.data.message)
      }
    }
    useEffect(()=>{
        fetchAllOrders()
    },[token])
  return (
    <div className="orders add">
      <h3>My Orders</h3>
      <div className="order-list">
        {
          orders.map((order,index)=>(
            <div className="order-item" key={index}>
              {/* <img src={`${url}/images/${order.item.image}`} alt="" /> */}
              <div>
                <p className='order-item-tea'>
                  {order.item.map((item,index)=>{
                    if(index === order.item.length-1){
                      return <div key={index}>
                        <img src={`${url}/images/${item.image}`} alt="" /> 
                        <p>{item.name}  x {item.quantity},</p>
                      </div>
                    }else{
                      return <div key={index}>
                        <img src={`${url}/images/${item.image}`} alt="" /> 
                        <p>{item.name}  x {item.quantity},</p>
                      </div>
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstname + " " +order.address.lastname}</p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>{order.address.city},{order.address.state},</p>
                  <p>{order.address.pincode},</p>
                  <p>{"+91 "+order.address.phone}.</p>
                </div>
              </div>
              <p>Items: {order.item.length}</p>
              <p style={{fontWeight:"bold"}}>Amount: ₹{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllOrders