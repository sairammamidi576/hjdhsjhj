import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({url,setToken}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState(""); 

    const onsubmitHandler = async(e) =>{
        try {
            e.preventDefault() 
            const response = await axios.post(url+"/user/admin",{email,password})
            // console.log(response);
            if(response.data.success){
              setToken(response.data.token);
              toast.success(response.data.message)
            }else{
              console.log("Error");
              toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="login_page">
      <div className="container">
        <h1>Admin Panel</h1>
        <form onSubmit={onsubmitHandler}>
            <div className='inputs'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='your@email.com' required />
            </div>
            <div className='inputs'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' required />
            </div>
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
