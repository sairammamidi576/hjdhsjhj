import React, { useState } from 'react'
import "./AddItem.css"
import axios from "axios"
import { uploads } from '../../assets/asset'
import { toast } from 'react-toastify'

const AddItem = ({url, token}) => {

  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Teas"
  })

  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data, [name]:value}))
  }
  const onsubmitHandler = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/products/add`, formData,{headers:{token}});
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:""
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):uploads} alt="upload image" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onchangeHandler} value={data.name} type="text" name='name' placeholder='product name'/>
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea onChange={onchangeHandler} value={data.description} name="description" rows="10"  placeholder='Description'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onchangeHandler} name="category">
              <option value="Teas">Teas</option>
              <option value="Coolers">Coolers</option>
              <option value="Shakes">Shakes</option>
              <option value="MilkShakes">MilkShakes</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onchangeHandler} value={data.price} type="text" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default AddItem
