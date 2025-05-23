import React, { useContext, useEffect, useState } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import { StoreContext } from '../../context/StoreContex'

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async() =>{
        const response = await axios.post(url+"/order/verify",{success,orderId});
        if(response.data.success){
            navigate('/myOrders');
        }else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
