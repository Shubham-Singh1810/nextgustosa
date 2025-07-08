import axios from "axios";

import { BASE_URL } from ".././utils/apibaseurlConfiguration";

// create address

export const addressCreate = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "address/create", formdata);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};


// get Address

export const addressList = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "address/list", payload);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// get Address

export const addressDelete = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}address/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
};


// update Address

// export const addressUpdate = async (formData) => {
//   try {
//  const { _id, createdAt, updatedAt, __v, ...sanitizedData } = formData;
// const response = await axios.put(BASE_URL + "address/update", sanitizedData);
    
//     return response.data;
//   } catch (error) {
//     console.error("Delete Error:", error);
//     throw error;
//   }
// };

export const addressUpdate = async (formData) => {
  try {
    const { _id, createdAt, updatedAt, __v, ...sanitizedData } = formData;
    const response = await axios.put(BASE_URL + "address/update", {
      ...sanitizedData,
      _id, // include id in body
    });
    return response.data;
  } catch (error) {
    console.error("Update Error:", error);
    throw error;
  }
};
