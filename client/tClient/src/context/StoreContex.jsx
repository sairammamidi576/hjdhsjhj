import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContexProvider = ({ children }) => {

  const [cartItem, setCartItem] = useState({})
  const [token,setToken] = useState("");
  const [teaList,setTeaList] = useState([]);
  const url = "http://localhost:2000";

  const addToCart = async(itemId) =>{
    if(!cartItem[itemId]){
      setCartItem(prev=>({...prev,[itemId]:1}))
    }else{
      setCartItem(prev=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(`${url}/cart/add`,{itemId},{headers:{token}});
    }
  }
  const removeFromCart = async(itemId) =>{
    setCartItem(prev=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(`${url}/cart/remove`,{itemId},{headers:{token}})
    }
  }
  const loadCartData = async(token) =>{
    const response = await axios.post(`${url}/cart/get`,{},{headers:{token}})
    setCartItem(response.data.cartData)
  }
  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItem){
      if(cartItem[item]>0){
        let itemInfo = teaList.find((product)=>product._id == item);
        // console.log(itemInfo);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  }
  const fetchTeaList = async() =>{
    const response = await axios.get(`${url}/products/list`,{})
    setTeaList(response.data.data);
  }

  useEffect(()=>{
    async function loadData(){
      await fetchTeaList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  },[])

  const contextValue = {
    teaList, cartItem,setCartItem,addToCart,removeFromCart, getTotalCartAmount,
    url,token,setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
  )
}

export default StoreContexProvider
