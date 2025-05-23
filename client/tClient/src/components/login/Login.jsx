import React, { useContext, useState } from 'react'
import "./login.css"
import { StoreContext } from '../../context/StoreContex'
import axios from "axios"

const Login = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [data,setData] = useState({
    name:'',email:'',password:''
  });
  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (e) =>{
    e.preventDefault();
    let newUrl = url;
    if(currentState === "Login"){
      newUrl += "/user/login";
    }else{
      newUrl += "/user/register";
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }else{
      alert(response.data.message);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currentState}</h2>
          <p onClick={()=>setShowLogin(false)}>❌</p>
        </div>
        <div className="login-input">
          {currentState==="Login"?<></>:<input name='name' onChange={onchangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create an Account":"Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & policy</p>
        </div>
        {currentState==="Login"?
        <p>create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
        :
        <p>Already  have an account? <span onClick={()=>setCurrentState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
