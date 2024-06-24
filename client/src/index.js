import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './Style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';


const baseURL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if necessary
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App axiosInstance={axiosInstance} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
