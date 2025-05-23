import React, { useState,useContext } from 'react'
import "./placeorder.css"
import { StoreContext } from '../../context/StoreContex'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const PlaceOrder = () => {

  const {getTotalCartAmount,token,teaList,cartItem,url,setCartItem} = useContext(StoreContext);
  const [data,setData] = useState({
    firstname:"",lastname:"",email:"",
    street:"",city:"",state:"",
    pincode:"",country:"",phone:""
  })
  const [method,setMethod] = useState("")
  const navigate = useNavigate()

  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id : order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        console.log(response);
        try{
          const {data} = await axios.post(url+"/order/verifyRpay",response,{headers:{token}})
          if(data.success){
            navigate("/myOrders")
            setCartItem({})
          }
        }catch(error){
          console.error(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onsubmitHandler = async (e) =>{
    e.preventDefault()
    try {
      let orderItems = [];
      teaList.map((item)=>{
        if(cartItem[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id]
          orderItems.push(itemInfo)
        }
      })
      let orderData = {
        address:data,
        item:orderItems,
        amount:getTotalCartAmount() + 2,
      }
      switch(method){
        // api calls for cash on delivery
        case "cod":
          const response = await axios.post(url+"/order/place",orderData,{headers:{token}})
          if(response.data.success){
            setCartItem({})
            navigate("/myOrders")
          }
          else{
            console.log("Error");
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(url+"/order/razorpay",orderData,{headers:{token}})
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className='place-order' onSubmit={onsubmitHandler}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" onChange={onchangeHandler} name='firstname' value={data.firstname} placeholder='Firstname' />
          <input required type="text" onChange={onchangeHandler} name='lastname' value={data.lastname} placeholder='Lastname' />
        </div>
        <input required type="email" onChange={onchangeHandler} name='email' value={data.email} placeholder='Email Address' />
        <input required type="text" onChange={onchangeHandler} name='street' value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" onChange={onchangeHandler} name='city' value={data.city} placeholder='City' />
          <input required type="text" onChange={onchangeHandler} name='state' value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" onChange={onchangeHandler} name='pincode' value={data.pincode} placeholder='Pin Code' />
          <input required type="text" onChange={onchangeHandler} name='country' value={data.country} placeholder='Country' />
        </div>
        <input required type="text" onChange={onchangeHandler} name='phone' value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()=== 0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()=== 0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <p style={{fontWeight:"bold"}}>Payment Method</p>
          <div className="payment-method" style={{display:"flex",alignItems:'center',gap:"10px"}}>
            <div className="rpay" onClick={()=>setMethod("razorpay")} style={{display:"flex",alignItems:"center",gap:"10px",cursor:'pointer'}}>
              <p className={`${method === "razorpay"?"bg-green":""}`} style={{width:"10px",height:"10px",border:"1px solid",borderRadius:"50%"}}></p>
              <p>RazorPay</p>
            </div>
            <div className="cashpay" onClick={()=>setMethod("cod")} style={{display:"flex",alignItems:"center",gap:"10px",cursor:'pointer'}}>
              <p className={`${method === "cod"?"bg-green":""}`} style={{width:"10px",height:"10px",border:"1px solid",borderRadius:"50%"}}></p>
              <p>Cash On Delivery</p>
            </div>
          </div>
          <button type='submit'>Proceed to Checkout</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
