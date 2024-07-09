import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

import './Style.css';
import App from './App';

// Ensure the environment variable is correctly set in your .env file
const baseURL = process.env.REACT_APP_API_URL;

// Create axios instance with baseURL from environment variable
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if necessary
  },
});

console.log('API URL:', baseURL); // Log the API URL to console
console.log('axiosInstance:', axiosInstance); // Log the API URL to console


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
