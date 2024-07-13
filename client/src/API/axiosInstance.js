import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Ensure this is correctly set
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
