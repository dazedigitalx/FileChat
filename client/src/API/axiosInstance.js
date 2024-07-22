import axios from 'axios';
import Cookies from 'js-cookie';

// Directly specify the API URL
const API_URL = process.env.REACT_APP_API_URL; // Use environment variable

// const API_URL = 'http://localhost:5000'; // Replace with your actual API URL
// const API_URL = 'https://file-chat-server.vercel.app'; // Replace with your actual API URL

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
