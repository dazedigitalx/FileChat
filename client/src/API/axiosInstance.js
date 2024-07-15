import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken') || Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log('Token:', token); // Debugging line
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
