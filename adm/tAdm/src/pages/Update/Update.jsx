import React, { useEffect, useState } from 'react'
import "./Update.css"
import { useParams } from "react-router-dom"
import axios from 'axios';
import {toast} from "react-toastify"
import { uploads } from '../../assets/asset';

const Update = ({url, token}) => {
  const {id} = useParams();
  // const url = "http://localhost:2000"
  const [value, setValue] = useState({
    id:id, name:"",
    description:"",
    price:"",
    category:"Teas",
    image:""
  })
  const [image, setImage] = useState(false);
  const fetchValue = async() =>{
    const res = await axios.get(`${url}/products/list/`+id,{headers:{token}});
    // console.log(res.data);
    setValue({...value,
      name:res.data.name,
      description:res.data.description,
      category:res.data.category,
      price:Number(res.data.price),
      image:res.data.image
    })
  }
  // const onchangeHandler = (e) =>{
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setValue(value=>({...value, [name]:value}))
  // }
  const onsubmitHandler = async(e) =>{
    e.preventDefault();
    
    const response = await axios.put(`${url}/products/update/`+id, value);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"",
        image:""
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    fetchValue()
  },[])
  return (
    <div className='update add'>
      <form onSubmit={onsubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={value.image?value.image:uploads} alt="upload image" />
          </label>
          {/* <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/> */}
        </div>
        <p>Product Name</p>
        <input type="text" onChange={(e)=>setValue({...value,name:e.target.value})} placeholder='product name' name='name' value={value.name} />
        <p>Product Description</p>
        <textarea name="description" onChange={(e)=>setValue({...value,description:e.target.value})} rows="6" value={value.description} placeholder='Description'></textarea>
        <div className="price-category">
            <select onChange={(e)=>setValue({...value,category:e.target.c})} name="category">
              <option value="Teas">Teas</option>
              <option value="Coolers">Coolers</option>
              <option value="Shakes">Shakes</option>
              <option value="MilkShakes">MilkShakes</option>
              <option value="Snacks">Snacks</option>
            </select>
          <input type="number" onChange={(e)=>setValue({...value,price:e.target.value})} name="price" value={value.price} placeholder='$20' />
        </div>
        <button type='submit' className='update-btn'>Update</button>
      </form>
    </div>
  )
}

export default Update
