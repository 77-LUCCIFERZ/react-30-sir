import axios from "axios";

// http://localhost:9005/
    // /auth/register. /auth/login
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    timeoutErrorMessage: "Server timed out",
    headers:{
        "Content-Type": "application/json"
    }
    // method: "GET, POST, PUT, PATCH, DELETE"
    // CRA => 
    // baseURL: process.env.REACT_APP_API_URL
});


// TODO
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    }, 
    (exception) => {
        throw exception.response
    }
)

export default axiosInstance