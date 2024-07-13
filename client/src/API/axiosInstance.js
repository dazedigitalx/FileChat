import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Log the base URL for debugging
console.log('Axios Base URL:', axiosInstance.defaults.baseURL);

export default axiosInstance;
