"use client"
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState  , useContext} from "react";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { LoggedDataContext } from '../context/Context';

const page = () => {

          const router = useRouter();
      const { updateLoggedUserData } = useContext(LoggedDataContext);

     const [userFormData, setUserFormData] = useState({
        phone: "",
        phoneOtp: "",
        firstName:"",
      });

      const [errorMessage, setErrorMessage] = useState("");
         const [showPhoneInput, setShowPhoneInput] = useState(false);
      
         const [phoneLoading, setPhoneLoading] = useState(false);
            const [otpLoading, setOtpLoading] = useState(false);
      
        const sendOtpFunc = async (e) => {
            console.log("send otp function called")
              e.preventDefault();
           if (!userFormData.phone) {
          setErrorMessage("Please enter your phone number first.");
          return;
        } 
         if (userFormData.phone.length !== 10) {
          setErrorMessage("Please enter a valid 10-digit phone number.");
          return;
        }
      
        setErrorMessage("");
        setPhoneLoading(true)
          try {
             const { phone } = userFormData;
            //  const payload = {
            //   phone : userFormData.phone,
            //   firstName: userFormData.firstName
            //  }
             console.log("api called")
            let response = await otpSend(phone);
            if (response?.statusCode == "200") {
              toast.success(response?.message);
              setShowPhoneInput(true);
              
            }
          } catch (error) {
            console.log(error?.response?.message);
             toast.error(error?.response?.data?.message);
          }
          setPhoneLoading(false)
        };
        const otpVerifyFunc = async (e) => {
             e.preventDefault();
            if (!userFormData.phoneOtp) {
          setErrorMessage("Please enter your otp first.");
          return;
        }
        setErrorMessage("");
        setOtpLoading(true);
          try {
            let response = await otpVerify(userFormData);
            if (response?.statusCode == "200") {
              toast.success(response?.message);
              updateLoggedUserData(response?.data);
                 router.push('/');
            }
          } catch (error) {
            console.log(error?.response?.data?.message);
                toast.error(error?.response?.data?.message);
          
          }
          setOtpLoading(false);
        };

  return (
    <>
      <Navbar />

      <div className="signup-page">
        <div className="signup-sections d-flex align-items-center flex-wrap flex-md-nowrap">
          <div className="signup-image d-flex justify-content-center mb-3">
            <img src="https://freshcart-next-js.vercel.app/images/svg-graphics/signin-g.svg" />
          </div>

          <div className="signup-form">
            <h2 className="text-center text-md-start "> Register to Get Started</h2>

            <form>
                <div className=" mb-4">
              <h6 className="fw-bold mb-4 text-center">Please Verify your phone number</h6>
              <input className = "form-control mb-3" placeholder="Enter you name"
                onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      firstName: e.target.value,
                    })
                  }></input>
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
                  style={{ backgroundColor: "#3d9970" }}
                  onClick={(e) => otpVerifyFunc(e)}
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
                  style={{ backgroundColor: "#3d9970" }}
                  onClick={(e) => sendOtpFunc(e)}
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
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
