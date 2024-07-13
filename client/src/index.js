import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from './API/axiosInstance'; // Import axiosInstance
import { AnonymousUserProvider } from './contexts/AnonymousUserContext';

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
  <AnonymousUserProvider>
    <React.StrictMode>
      <AuthProvider>
        <App axiosInstance={axiosInstance} />
      </AuthProvider>
    </React.StrictMode>
  </AnonymousUserProvider>
);

// Report web vitals
reportWebVitals();
