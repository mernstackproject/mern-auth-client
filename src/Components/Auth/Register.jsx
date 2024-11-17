import React, { useState } from "react";
import "./Register.css";
import Input from "../Inputs/Input";
import Button from "../Button/Button";
import {handleChange} from "./services/OnchangeService"
import { register } from "./services/Api";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
const Register = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
  name:"",
  email:"",
  password:"",
  mobile:"",
  nameError:"",
  emailError:"",
  passwordError:"",
  mobileError:""

  });
  const [disable,setDisable] = useState(false)
  const handleRegister= async(e)=>{
    e.preventDefault();
    const data  = await register({formData})
    setDisable(true)
    try{
      if(data.status){
       toast.success(data.message,{
        autoClose: 1000
       }) 
       setTimeout(()=>{
        navigate("/login", {replace:true})
       }, 3000)
      }else{
        toast.error(data.error,{
          autoClose: 1000
        });
      }
    }catch(e){
      toast.error(`${e.response.error}`,{
        autoClose: 1000
      });
    }finally{
      setTimeout(() => {
        setDisable(false);
      }, 4000);
    }
  }
  return (
    <>
    <Navbar />
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Your Account</h2>
        <form onSubmit={handleRegister} className="register-form" autoComplete="off">
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <Input
              type="text"
              id="name"
              className="input-field"
              placeholder="Enter your name"
              onChange={(e)=> handleChange(e,formData,setFormData)}
              value={formData.name}
              name="name"
              error={formData.nameError}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              onChange={(e)=> handleChange(e,formData,setFormData)}
              value={formData.email}
              name="email"
              error={formData["emailError"]}
            />    
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              autoComplete="on"
              onChange={(e)=> handleChange(e,formData,setFormData)}
              value={formData.password}
              name="password"
              error={formData["passwordError"]}
            />
          </div>

          <div className="input-group">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <Input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            autoComplete="on"
            onChange={(e)=> handleChange(e,formData,setFormData)}
            value={formData.mobile}
            name="number"
            error={formData["mobileError"]}
          />
        </div>
          <Button type="submit" className="register-btn" value={disable ? "...." : "Register"} />
        </form>
        <p className="register-footer">
          Already have an account?
          <a href="/login" className="login-link">
            Login here
          </a>
        </p>
      </div>
     <ToastContainer />
    </div>
    </>
  );
};

export default Register;
