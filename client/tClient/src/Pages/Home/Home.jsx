import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/header/Header'
import Exploremenu from '../../components/Explore Menu/Exploremenu'
import TeaDisplay from '../../components/Tea display/TeaDisplay'

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div className='home'>
      <Header />
      <Exploremenu category={category} setCategory={setCategory}/>
      <TeaDisplay category={category}/>
    </div>
  )
}

export default Home
