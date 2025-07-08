import axios from "axios";

import { BASE_URL } from ".././utils/apibaseurlConfiguration";



// export const signUp = async (formData) => {
//   try {
//     const response = await axios.post(BASE_URL + "user/sign-up" , formData);
//       console.log("Signup Success:", response.data);
//     return response.data;
    
//   } catch (error) {
//     console.error("Signup Error:", error);
//     throw error; 
//   }
// };

// sign up api

export const signUp = async (formData) => {
  try {
    const response = await axios.post(
      BASE_URL + "user/sign-up",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// login api 

export const logIn = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "user/login", formdata);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};


//otp send api

export const otpSend = async (phone) => {
  try {
    const response = await axios.post(BASE_URL + "user/send-otp", { phone });
    return response.data;
  } catch (error) {
    console.error("OTP Send Error:", error);
    throw error;
  }
};

// otp verify api

export const otpVerify = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "user/otp-verification", formdata);
    return response.data;
  } catch (error) {
    console.error("OTP Verify Error:", error);
    throw error;
  }
};

//user details update

export const userUpdateServ = async (formdata) => {
  try {
    const response = await axios.put(BASE_URL + "user/update", formdata ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    return response.data;
  } catch (error) {
    console.error("use update Error:", error);
    throw error;
  }
};