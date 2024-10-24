import axios from 'axios';
import Cookies from 'js-cookie';

// Hardcode the API URL
const API_URL = 'https://file-chat-server.vercel.app'; 

// Debugging line to ensure API_URL is set
console.log('REACT_APP_API_URL:', API_URL); // Corrected variable

const axiosInstance = axios.create({
  baseURL: API_URL, // Now using the hardcoded URL
});

// Interceptor to add authorization token to request headers
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
