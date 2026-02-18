import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3002",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// export default axiosInstance;