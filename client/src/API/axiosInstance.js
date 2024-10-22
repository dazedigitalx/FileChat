import axios from 'axios';
import Cookies from 'js-cookie';

// Directly specify the API URL
const API_URL = process.env.REACT_APP_API_URL; // Use environment variable

// Debugging line to ensure API_URL is set
console.log('API URL:', API_URL); 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Token:', token); // Debugging line
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
