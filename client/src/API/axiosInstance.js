import axios from 'axios';
import Cookies from 'js-cookie';

// Directly specify the API URL using environment variable
const API_URL = process.env.REACT_APP_API_URL; 

// Debugging line to ensure API_URL is set
console.log('REACT_APP_API_URL:', API_URL); // Corrected variable

const axiosInstance = axios.create({
  baseURL: API_URL, // Ensure this is properly set
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
