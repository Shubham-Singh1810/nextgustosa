import axios from "axios";

import { BASE_URL } from ".././utils/apibaseurlConfiguration";

const getConfig = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  };
};
export const getFaqListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "support/list-faq", formData);
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

