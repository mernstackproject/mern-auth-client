// import React, { useState , useEffect} from "react";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";
// import Input from "../Inputs/Input";
// import GoogleAuth from "./GoogleAuth";
// import { login } from "./services/Api";
// import { handleChangeLogin } from "./services/OnchangeService";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../pages/Navbar";
// import FetchService from "./services/FetchService";
// const Login = () => {
//   const {  refetch } = FetchService("/found-user");
//   const navigate = useNavigate();
//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//     emailError: "",
//     passwordError: "",
//   });
//   const [disable, setDisable] = useState(false);
//   useEffect(() => {
//     let token = localStorage.getItem("auth")
//     if (token && token!== undefined) {
//       navigate("/books", { replace: true });
      
//     }
//   }, [ navigate]);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const data = await login({ loginForm });
//     setDisable(true);
//     try {
//       if (data.status) {
//         toast.success(data.message,{
//           autoClose: 1000
//         });
//         localStorage.setItem("auth", data.data.token)
//         setTimeout(()=>{
//          navigate("/books", {replace:true})
        
//         }, 3000)
//         refetch()
       
//       } else {
//         toast.error(data.error, {
//           autoClose: 1000
//         });
//       }
//     } catch (e) { 
//       console.log(e,"error")
//       toast.error(`${e.response?.error}`,{
//         autoClose: 1000
//       });
//     } finally {
//       setTimeout(() => {
//         setDisable(false);
//       }, 4000);
//     }
//   };
//   return (
//     <>
//     <Navbar />
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">Login to Your Account</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <div className="input-group">
//             <label htmlFor="email" className="input-label">
//               Email
//             </label>
//             <Input
//               type="email"
//               id="email"
//               className="input-field"
//               placeholder="Enter your email"
//               onChange={(e) => {
//                 handleChangeLogin(e, loginForm, setLoginForm);
//               }}
//               value={loginForm.email}
//               name="email"
//               error={loginForm.emailError}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password" className="input-label">
//               Password
//             </label>
//             <Input
//               type="password"
//               id="password"
//               className="input-field"
//               placeholder="Enter your password"
//               autoComplete="on"
//               onChange={(e) => {
//                 handleChangeLogin(e, loginForm, setLoginForm);
//               }}
//               value={loginForm.password}
//               name="password"
//               error={loginForm.passwordError}
//             />
//           </div>
//           <button disabled={disable} type="submit" className="login-btn">
//             {disable ? <div className="spinner"></div> : "Login"}
//           </button>
//         </form>
//         {/* Google Login Section */}
//         <div className="separator">
//           <span>OR</span>
//         </div>
//          <GoogleAuth/>
//         <p className="login-footer">
//           Don't have an account?{" "}
//           <a href="/register" className="register-link">
//             Register here
//           </a>
//         </p>
//       </div>
//       <ToastContainer  />
//     </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/Input";
import GoogleAuth from "./GoogleAuth";
import { login } from "./services/Api";
import { handleChangeLogin } from "./services/OnchangeService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../pages/Navbar";
import FetchService from "./services/FetchService";

const Login = () => {
  const { refetch } = FetchService("/found-user");
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    rememberMe: false, // Add rememberMe state
  });
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      navigate("/books", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = loginForm;
    setDisable(true);
    try {
      const data = await login({ email, password, rememberMe }); 
      if (data.status) {
        toast.success(data.message, { autoClose: 1000 });

        // Store token based on Remember Me
        if (rememberMe) {
          localStorage.setItem("auth", data.data.token);
        } else {
          sessionStorage.setItem("auth", data.data.token);
        }

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
        refetch();
      } else {
        toast.error(data.error, { autoClose: 1000 });
      }
    } catch (e) {
      console.log(e, "error");
      toast.error(`${e.response?.error}`, { autoClose: 1000 });
    } finally {
      setTimeout(() => setDisable(false), 4000);
    }
  };

  const handleCheckboxChange = () => {
    setLoginForm((prevState) => ({
      ...prevState,
      rememberMe: !prevState.rememberMe,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                onChange={(e) => handleChangeLogin(e, loginForm, setLoginForm)}
                value={loginForm.email}
                name="email"
                error={loginForm.emailError}
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
                onChange={(e) => handleChangeLogin(e, loginForm, setLoginForm)}
                value={loginForm.password}
                name="password"
                error={loginForm.passwordError}
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                checked={loginForm.rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button disabled={disable} type="submit" className="login-btn">
              {disable ? <div className="spinner"></div> : "Login"}
            </button>
          </form>
          <div className="separator">
            <span>OR</span>
          </div>
          <GoogleAuth />
          <p className="login-footer">
            Don't have an account?{" "}
            <a href="/register" className="register-link">
              Register here
            </a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
