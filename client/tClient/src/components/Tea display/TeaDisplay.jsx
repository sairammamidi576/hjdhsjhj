import React, { useContext } from 'react'
import "./teaDisplay.css"
import { StoreContext } from '../../context/StoreContex'
import TeaItem from '../Tea Item/TeaItem'

const TeaDisplay = ({category}) => {
    const {teaList} = useContext(StoreContext)
  return (
    <div className='tea-display'>
      <h2>Top Teas</h2>
      <div className="tea-display-list">
        {teaList.map((item,index)=>{
          const {_id,name,price,description,image} = item;
          if(category==="All" ||category===item.category){
            return <TeaItem key={index} id={_id} name={name} price={price} description={description} image={image}/>
          }
        })}
      </div>
    </div>
  )
}

export default TeaDisplay
