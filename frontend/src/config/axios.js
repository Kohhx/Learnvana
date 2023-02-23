import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_ENV  === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_API_URL,
});

console.log("Axios Instance",axiosInstance)

export { axiosInstance };
