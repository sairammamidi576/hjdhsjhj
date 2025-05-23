import React, { useContext, useState } from 'react'
import "./TeaItem.css"
import { StoreContext } from '../../context/StoreContex';

const TeaItem = ({id,name,price,description,image}) => {
  const {url,cartItem, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className='tea-item'>
      <div className="tea-item-img-container">
        <img className='tea-item-img' src={url+"/images/"+image} alt="" />
        {!cartItem[id]?
          <p onClick={()=>addToCart(id)} className='add'>➕</p>:
          <div className='tea-item-counter'>
            <p onClick={()=>removeFromCart(id)} className='minus'>➖</p>  
            <span>{cartItem[id]}</span>
            <p onClick={()=>addToCart(id)} className='plus'>➕</p>
          </div>}
      </div>
      <div className="tea-item-info">
        <div className="tea-item-name">
          <p>{name}</p>
        </div>
        <p className="tea-item-desc">{description}</p>
        <p className="tea-item-price">{price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default TeaItem
