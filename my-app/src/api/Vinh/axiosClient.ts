import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://644c709d57f12a1d3dcb1aaf.mockapi.io/api/",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);



export default axiosClient;
