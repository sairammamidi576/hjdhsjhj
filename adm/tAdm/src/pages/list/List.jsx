import React, { useEffect, useState } from 'react'
import "./list.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

const List = ({url,token}) => {
  const navigate = useNavigate()
  const [list , setList] = useState([]);
  
  const fetchList = async() =>{
    const response = await axios.get(`${url}/products/list`);
    if(response.data){
      setList(response.data.data);
    }else{
      toast.error(response.data.error)
    }
  }
  const removeFood = async (productId) =>{
    const res = await axios.post(`${url}/products/remove`,{id:productId},{headers:{token}});
    if(res.data.success){
      toast.success(res.data.message)
      await fetchList();
    }else{
      toast.error(res.data.message)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="remove">x</p>
              <p onClick={()=>navigate("/update/"+item._id)} className="update">🖊</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
