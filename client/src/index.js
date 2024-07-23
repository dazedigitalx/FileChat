import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from './API/axiosInstance'; // Import axiosInstance
import { GuestUserProvider } from './contexts/GuestUserContext'; // Import the correct provider

// Log environment variables for debugging
console.log('Using environment:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

// Determine the environment
const environment = process.env.NODE_ENV;
const apiUrl = process.env.REACT_APP_API_URL;

// Log the API URL and environment for debugging
console.log(`Environment: ${environment}`);
console.log(`Client API URL: ${apiUrl}`);

// Create the root element for rendering
const root = createRoot(document.getElementById('root'));

// Render the application
root.render(
  <GuestUserProvider>
    <React.StrictMode>
      <AuthProvider>
        <App axiosInstance={axiosInstance} />
      </AuthProvider>
    </React.StrictMode>
  </GuestUserProvider>
);

// Report web vitals
reportWebVitals();
