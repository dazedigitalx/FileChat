import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from './API/axiosInstance';
import { GuestUserProvider } from './contexts/GuestUserContext';
import Messages from './components/Messages';

// Log environment variables for debugging
console.log('Using environment:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

// Create the root element for rendering
const root = createRoot(document.getElementById('root'));

// Render the application
root.render(
  <GuestUserProvider>
    <React.StrictMode>
      <AuthProvider>
        <App axiosInstance={axiosInstance} />
        <Messages /> {/* Render Messages component here */}
      </AuthProvider>
    </React.StrictMode>
  </GuestUserProvider>
);

// Report web vitals
reportWebVitals();
