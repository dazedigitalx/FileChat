import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from './API/axiosInstance'; // Import axiosInstance

// Log environment variables for debugging
console.log('Using environment file:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);


// Check which environment is being used
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


// Check which environment is being used
const environment = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

console.log('Using environment file:', environment);
console.log('REACT_APP_API_URL:', REACT_APP_API_URL);



// Create the root element for rendering
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App axiosInstance={axiosInstance} />
    </AuthProvider>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();
