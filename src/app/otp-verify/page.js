// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { otpVerify } from '../services/authentication.service'


// const page = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const router = useRouter();

//   const handleChange = (e, index) => {
//     const { value } = e.target;
//     if (/^\d*$/.test(value) && value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
//       if (value && index < otp.length - 1) {
//         document.getElementById(`otp-input-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpValue = otp.join('');
//     const otpData = {
//       email: "demo@email.com", 
//       otp: otpValue,
//     };
//     console.log('OTP Data:', otpData);
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="bg-white p-4 shadow otp-box">
//         <h1 className="text-center mb-3">OTP Verification</h1>
//         <p className="text-center text-muted">Enter the OTP sent to your registered email</p>
//         <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3 p-3">
//           <div className="d-flex gap-2 justify-content-center my-3">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-input-${index}`}
//                 type="text"
//                 maxLength="1"
//                 className="form-control text-center otp-input"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 autoComplete="off"
//               />
//             ))}
//           </div>
//           <button type="submit" className="otp-submit text-white">Verify & Proceed</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { otpVerify } from "../services/authentication.service"; // adjust path if needed

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("userPhone");
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      alert("No phone number found. Please sign up again.");
      router.push("/signup");
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input automatically
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length < 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }

    const otpData = {
      phone: phone,
      phoneOtp: otpValue,
    };

    try {
      const response = await otpVerify(otpData);
      console.log("OTP verified successfully:", response);

      alert("OTP verified!");
      router.push("/login"); 

    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 shadow otp-box">
        <h1 className="text-center mb-3">OTP Verification</h1>
        <p className="text-center text-muted">
          Enter the 4-digit OTP sent to your phone: <b>{phone}</b>
        </p>
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3 p-3">
          <div className="d-flex gap-2 justify-content-center my-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                className="form-control text-center otp-input"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                autoComplete="off"
                style={{ width: "40px", height: "40px", fontSize: "20px" }}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary">Verify & Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
