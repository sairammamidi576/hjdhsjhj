import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios'

const MyOrders = () => {

    const [data, setData] = useState([])
    const {url, token} = useContext(StoreContext)

    const fetchOrders = async() =>{
      const response = await axios.post(url+"/order/userOrders",{},{headers:{token}})
      console.log(response);
      setData(response.data.data);
    }
    useEffect(()=>{
      if(token){
        fetchOrders()
      }
    },[token])

  return (
    <div className='my-orders'>
      <h3>My Orders</h3>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div className="my-orders-order" key={index}>
              <p>{order.item.map((item,index)=>{
                if(index === order.item.length-1){
                  return item.name +" * "+ item.quantity
                }else{
                  return item.name +" * "+ item.quantity+", "
                }
              })}</p>
              <p>{order.amount.toFixed(2)}</p>
              <p>Items:{order.item.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <p>Payment: {order.paymentMethod}</p>
              <button>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
