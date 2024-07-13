import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // This will be set from the .env files
});


export default axiosInstance;


// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default axiosInstance; // Ensure this line is present
