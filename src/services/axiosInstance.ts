import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api", // Set your API base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
