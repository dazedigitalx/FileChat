import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import App from './App';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);


const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Corrected baseURL to API_BASE_URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if necessary
  },
});

console.log('API_BASE_URL:', API_BASE_URL);
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);

console.log('axiosInstance:', axiosInstance);

console.log('Source path of .env file:', __filename); // Log the source path of the file loaded

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App axiosInstance={axiosInstance} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

export default App;
