import React from 'react'
import "./explore.css"
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of teas crafted with the finest ingrediants and culinary expertise. Our Mission is to satisfy your tea cravings and elevate tour tea experience, one delicious tea at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          const {menu_img,menu_name} = item;
          return (
            <div onClick={()=>setCategory(prev=>prev===menu_name?"All":menu_name)} className="explore-menu-list-item" key={index}>
              <img className={category===menu_name?"active":""} src={menu_img} alt="" />
              <p>{menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Exploremenu
