import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import App from './App';

// Configure the API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the root element for rendering
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App axiosInstance={axiosInstance} />
    </AuthProvider>
  </React.StrictMode>
);

// Log the axios instance for debugging
console.log('index.js axiosInstance:', axiosInstance);

// Report web vitals
reportWebVitals();

export default App;
