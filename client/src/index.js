import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import App from './App';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if necessary
  },
});

console.log('API_BASE_URL:', baseURL); // Log the API_BASE_URL to console
console.log('axiosInstance:', axiosInstance); // Log the axiosInstance to console

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
