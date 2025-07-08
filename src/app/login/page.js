// "use client"

// import React, { useState } from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'
// import { useRouter } from 'next/navigation';
// import { logIn } from '../services/authentication.service';
// import { LoggedDataContext } from '../context/Context';
// import { useContext, useState } from 'react'; 


// const page = () => {

//      const router = useRouter();
//      const { updateLoggedUserData } = useContext(LoggedDataContext); // Context function


//       const handleSignup = () => {
//      router.push("/signup");
//   }

//   const[formdata , setFormData] = useState({
//     phone:"",
//     password:""
//   });

// const handleOnchange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };


//  const handleSubmit = async(e) => {
//     e.preventDefault();
//     try{
//       const res = await logIn(formdata);
//        console.log("Message sent successfully!");
//        alert("login")
//        router.push("/")
//     }
//     catch(error){
//       console.log("login error" + error)
//     }
//  }

//   return (
//     <>
//     <Navbar/>
//     <div className='login-page'>
//        <div className='login-sections  d-flex align-items-center flex-wrap flex-md-nowrap'>
//          <div className='login-image d-flex justify-content-center'>
//             <img src='https://freshcart-next-js.vercel.app/images/svg-graphics/signin-g.svg'/>
//          </div>
//          <div className='login-form'>
//             <h2>Login to Your Account</h2>
//           <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
//                 <div className="signup-div">
//                 <input type="tel" placeholder="Phone" name="phone" required onChange={handleOnchange} />
//               </div>
//                <div className="signup-div">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   name="password"
//                   required
//                   onChange={handleOnchange}
//                 />
//                 <button type="submit" className="register mt-3">Log In</button>
//               </div>
//           </form>
//             <p className="signup-p">Don't have an account? <span className="signin-option fw-bold" onClick={handleSignup}>Sign Up</span></p>
//          </div>
//        </div>
//     </div> 

//     <Footer/>
//     </>
//   )
// }

// export default page


"use client"

import React, { useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useRouter } from 'next/navigation';
import { logIn } from '../services/authentication.service';
import { LoggedDataContext } from '../context/Context';
import { toast } from "react-toastify";
import FooterNav from '../Components/FooterNav';

const page = () => {
  const router = useRouter();
  const { updateLoggedUserData } = useContext(LoggedDataContext);

  const [formdata, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(formdata); // API call
      console.log("Login response:", res.data);

      if (res?.statusCode == 200) {
        // const userData = {
        //   email: res.data.data.email,
        //   firstName: res.data.data.firstName,
        //   lastName: res.data.data.lastName,
        //   phoneNumber: res.data.data.phone,
        // };

        updateLoggedUserData(res?.data); // Context will also save to localStorage

        toast.success(res.message);
        router.push("/");
      } else {
            toast.error(res.message);
        console.log(typeof res.data.statusCode, res.data.statusCode);
      }
    } catch (error) {
      console.log("Login error:", error);
           toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='login-page'>
        <div className='login-sections d-flex align-items-center flex-wrap flex-md-nowrap'>
          <div className='login-image d-flex justify-content-center'>
            <img src='https://freshcart-next-js.vercel.app/images/svg-graphics/signin-g.svg' />
          </div>
          <div className='login-form'>
            <h2>Login to Your Account</h2>
            <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
              <div className="signup-div">
                <input type="tel" placeholder="Phone" name="phone" required onChange={handleOnchange} />
              </div>
              <div className="signup-div">
                <input type="password" placeholder="Password" name="password" required onChange={handleOnchange} />
                <button type="submit" className="register mt-3">Log In</button>
              </div>
            </form>
            <p className="signup-p">Don't have an account? <span className="signin-option fw-bold" onClick={handleSignup}>Sign Up</span></p>
          </div>
        </div>
      </div>
      <FooterNav/>
      <Footer />
    </>
  );
};

export default page;
