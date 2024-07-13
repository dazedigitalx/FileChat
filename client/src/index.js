import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import App from './App';

// Check which environment is being used
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


// Check which environment is being used
const environment = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

console.log('Using environment file:', environment);
console.log('REACT_APP_API_URL:', REACT_APP_API_URL);




// Create an axios instance
const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
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
// console.log('index.js axiosInstance:', axiosInstance);

// Report web vitals
reportWebVitals();

export default App;
