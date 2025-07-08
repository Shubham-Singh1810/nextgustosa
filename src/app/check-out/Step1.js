// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { LoggedDataContext } from "../context/Context";
// import { otpSend, otpVerify } from "../services/authentication.service";
// import { toast } from "react-toastify";

// const Step1 = ({ next }) => {
//   const { loggedUserData, updateLoggedUserData } = useContext(LoggedDataContext);

//   const [userFormData, setUserFormData] = useState({
//     phone: "",
//     phoneOtp: "",
//     firstName:""
//   });



//  useEffect(() => {
//    console.log("form data" , userFormData)
//   }, [userFormData]);
 
//   useEffect(() => {
//     if (loggedUserData?._id) {
//       next();
     
//     }
//   }, [loggedUserData, next]);

//    const [errorMessage, setErrorMessage] = useState("");
//    const [showPhoneInput, setShowPhoneInput] = useState(false);
 
//    const [phoneLoading, setPhoneLoading] = useState(false);
//    const [otpLoading, setOtpLoading] = useState(false);
 
//    const sendOtpFunc = async () => {
     
//      if (!userFormData.phone) {
//        setErrorMessage("Please enter your phone number first.");
//        return;
//      }
//      if (userFormData.phone.length !== 10) {
//        setErrorMessage("Please enter a valid 10-digit phone number.");
//        return;
//      }
 
//      setErrorMessage("");
//      setPhoneLoading(true);
//      try {
//        const { phone } = userFormData;
//        console.log("phone" ,phone)
//        let response = await otpSend(phone);
//        if (response?.statusCode == "200") {
//          toast.success(response?.message);
//          setShowPhoneInput(true);
//        }
//      } catch (error) {
//        console.log(error?.response?.message);
//        toast.error(error?.response?.data?.message);
//      }
//      setPhoneLoading(false);
//    };
//    const otpVerifyFunc = async () => {
    

//      if (!userFormData.phoneOtp) {
//        setErrorMessage("Please enter your otp first.");
//        return;
//      }
//       if(!userFormData.firstName){
//         setErrorMessage("Please enter you name");
//         return
//       }
//      setErrorMessage("");
//      setOtpLoading(true);
//      try {
//        let response = await otpVerify(userFormData);
//        if (response?.statusCode == "200") {
//          toast.success(response?.message);
//          updateLoggedUserData(response?.data);
//           next();
//        }
//      } catch (error) {
//        console.log(error?.response?.data?.message);
//        toast.error(error?.response?.data?.message);
//      }
//      setOtpLoading(false);
//    };

//   return (
//      <div className=" p-md-4 mb-4  container d-flex justify-content-center align-items-center" style={{borderRadius:"13px", minHeight:"50vh"}}>
           
//             <div style={{width: "50%"}} className="stepPage border p-md-4 p-3 rounded py-md-5 py-3 bg-light shadow">
//                 {/* <div className="d-flex justify-content-center my-2">

//                 <img src="https://cdn-icons-png.flaticon.com/128/1356/1356596.png"/>
//                 </div> */}
//                   <h6 className="fw-bold mb-4">
//                     Please Verify your phone number
//                   </h6>
//                   <label>Full Name</label>
//                    <input className = "form-control mb-3" placeholder="Enter you name"
//                 onChange={(e) =>
//                     setUserFormData({
//                       ...userFormData,
//                       firstName: e.target.value,
//                     })
//                   }></input>
//                  <label>Phone Number</label>
//                   <input
//                     value={userFormData.phone}
//                     className="form-control mb-3"
//                     placeholder="Enter number"
//                     required
//                     onChange={(e) =>
//                       setUserFormData({
//                         ...userFormData,
//                         phone: e.target.value,
//                       })
//                     }
//                   />
//                   {showPhoneInput && (
//                     <input
//                       value={userFormData?.phoneOtp}
//                       className="form-control mt-2"
//                       placeholder="Enter OTP"
//                       style={{ height: "45px" }}
//                       onChange={(e) =>
//                         setUserFormData({
//                           ...userFormData,
//                           phoneOtp: e.target.value,
//                         })
//                       }
//                     />
//                   )}
//                   {errorMessage && (
//                     <p className="text-danger mt-2">{errorMessage}</p>
//                   )}

//                   {showPhoneInput ? (
//                     <button
//                       className="btn  w-100  mt-3 text-white"
//                       style={{ backgroundColor: "maroon" }}
//                       onClick={() => otpVerifyFunc()}
//                       disabled={otpLoading}
//                     >
//                       {otpLoading ? (
//                         <span className="spinner-border spinner-border-sm"></span>
//                       ) : (
//                         "Verify OTP"
//                       )}
//                     </button>
//                   ) : (
//                     <button
//                       className="btn w-100 mt-2 text-white"
//                       style={{ backgroundColor: "maroon" }}
//                       onClick={sendOtpFunc}
//                       disabled={phoneLoading}
//                     >
//                       {phoneLoading ? (
//                         <span className="spinner-border spinner-border-sm"></span>
//                       ) : (
//                         "Send OTP"
//                       )}
//                     </button>
//                   )}
//                 </div>
//      </div>
//   );
// };

// export default Step1;


"use client";
import React, { useContext, useEffect, useState } from "react";
import { LoggedDataContext } from "../context/Context";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";

const Step1 = ({ next }) => {
  const { loggedUserData, updateLoggedUserData } = useContext(LoggedDataContext);

  const [userFormData, setUserFormData] = useState({
    phone: "",
    phoneOtp: "",
    firstName:""
  });



 useEffect(() => {
   console.log("form data" , userFormData)
  }, [userFormData]);
 
  useEffect(() => {
    if (loggedUserData?._id) {
      next();
     
    }
  }, [loggedUserData, next]);

   const [errorMessage, setErrorMessage] = useState("");
   const [showPhoneInput, setShowPhoneInput] = useState(false);
 
   const [phoneLoading, setPhoneLoading] = useState(false);
   const [otpLoading, setOtpLoading] = useState(false);

 
 
   const sendOtpFunc = async () => {
     
     if (!userFormData.phone) {
       setErrorMessage("Please enter your phone number first.");
       return;
     }
     if (userFormData.phone.length !== 10) {
       setErrorMessage("Please enter a valid 10-digit phone number.");
       return;
     }
 
     setErrorMessage("");
     setPhoneLoading(true);
     try {
       const { phone } = userFormData;
       console.log("phone" ,phone)
       let response = await otpSend(phone);
       if (response?.statusCode == "200") {
         toast.success(response?.message);
         setShowPhoneInput(true);
       }
     } catch (error) {
       console.log(error?.response?.message);
       toast.error(error?.response?.data?.message);
     }
     setPhoneLoading(false);
   };
   const otpVerifyFunc = async () => {
    

     if (!userFormData.phoneOtp) {
       setErrorMessage("Please enter your otp first.");
       return;
     }
      if(!userFormData.firstName){
        setErrorMessage("Please enter you name");
        return
      }
     setErrorMessage("");
     setOtpLoading(true);
     try {
       let response = await otpVerify(userFormData);
       if (response?.statusCode == "200") {
         toast.success(response?.message);
         updateLoggedUserData(response?.data);
          next();
       }
     } catch (error) {
       console.log(error?.response?.data?.message);
       toast.error(error?.response?.data?.message);
     }
     setOtpLoading(false);
   };

  return (
     <div className=" p-md-4 mb-4  container d-flex justify-content-center align-items-center" style={{borderRadius:"13px", minHeight:"50vh"}}>
           
            <div style={{width: "50%"}} className="stepPage border p-md-4 p-3 rounded py-md-5 py-3 bg-light shadow">
                {/* <div className="d-flex justify-content-center my-2">

                <img src="https://cdn-icons-png.flaticon.com/128/1356/1356596.png"/>
                </div> */}
                  <h6 className="fw-bold mb-4">
                    Please Verify your phone number
                  </h6>
                  <label>Full Name</label>
                   <input className = "form-control mb-3" placeholder="Enter you name"
                onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      firstName: e.target.value,
                    })
                  }></input>
                 <label>Phone Number</label>
                  <input
                    value={userFormData.phone}
                    className="form-control mb-3"
                    placeholder="Enter number"
                    required
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                  {showPhoneInput && (
                    <input
                      value={userFormData?.phoneOtp}
                      className="form-control mt-2"
                      placeholder="Enter OTP"
                      style={{ height: "45px" }}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          phoneOtp: e.target.value,
                        })
                      }
                    />
                  )}
                  {errorMessage && (
                    <p className="text-danger mt-2">{errorMessage}</p>
                  )}

                  {showPhoneInput ? (
                    <button
                      className="btn  w-100  mt-3 text-white"
                      style={{ backgroundColor: "maroon" }}
                      onClick={() => otpVerifyFunc()}
                      disabled={otpLoading}
                    >
                      {otpLoading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn w-100 mt-2 text-white"
                      style={{ backgroundColor: "maroon" }}
                      onClick={sendOtpFunc}
                      disabled={phoneLoading}
                    >
                      {phoneLoading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                </div>
     </div>
  );
};

export default Step1;