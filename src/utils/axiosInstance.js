import axios from "axios";
import { BASE_URL } from "./baseURL";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  
  if (error.response && error.response.status === 401) {
    try {
      console.log("req for new tokens");
      
      await axios.get(BASE_URL + "users/generate-new-tokens", {withCredentials: true});

      return axiosInstance(error.config);
    } catch (error) {
      console.log("error in new tokens", error);
      
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
});


export default axiosInstance;
