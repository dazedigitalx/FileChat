[33mcommit 4bf43e1e9d446fed6dc71c080ac930603ad291cf[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Interaktika Studio <dazedigital@gmail.com>
Date:   Thu Jul 11 05:32:01 2024 -0400

    mod env axios

[1mdiff --git a/client/src/Login.js b/client/src/Login.js[m
[1mindex 6818ecd..3560a34 100644[m
[1m--- a/client/src/Login.js[m
[1m+++ b/client/src/Login.js[m
[36m@@ -3,7 +3,6 @@[m [mimport { useNavigate, Link } from 'react-router-dom';[m
 import { useAuth } from './AuthContext';[m
 import axios from 'axios';[m
 [m
[31m-[m
 import './Login.css';[m
 import './Style.css';[m
 [m
[36m@@ -35,21 +34,19 @@[m [mconst Login = ({ axiosInstance }) => {[m
     const handleLogin = async () => {[m
         console.log('Login form submitted');[m
         console.log('Email:', email);[m
[31m-        // console.log('Password:', password);[m
[31m-    [m
[31m-        // Ensure axiosInstance is defined before proceeding[m
[32m+[m[32m        console.log('API_BASE_URL:', API_BASE_URL); // Log API_BASE_URL[m
[32m+[m
         if (!axiosInstance) {[m
             console.error('axiosInstance is undefined!');[m
             console.log('axiosInstance:', axiosInstance);[m
[31m-[m
             return;[m
         }[m
[31m-    [m
[32m+[m
         try {[m
             const response = await axiosInstance.post(`${API_BASE_URL}/api/users/login`, { email, password });[m
             const responseData = response.data;[m
             console.log('Response data:', responseData);[m
[31m-    [m
[32m+[m
             if (response.status === 200) {[m
                 const { token, id, email, username } = responseData;[m
                 console.log('User data:', { id, email, username });[m
[36m@@ -57,7 +54,7 @@[m [mconst Login = ({ axiosInstance }) => {[m
                 localStorage.setItem('accessToken', token);[m
                 setMessage('User logged in successfully');[m
                 setError('');[m
[31m-    [m
[32m+[m
                 navigate('/dashboard');[m
             } else {[m
                 setError(`Failed to login: ${responseData.message}`);[m
[36m@@ -68,7 +65,7 @@[m [mconst Login = ({ axiosInstance }) => {[m
             setError(`Error logging in. Please try again later. Details: ${error.message}`);[m
         }[m
     };[m
[31m-    [m
[32m+[m
     return ([m
         <div className="login-page">[m
             <div className="login-hero-image"></div>[m
[1mdiff --git a/client/src/index.js b/client/src/index.js[m
[1mindex a3029f0..d78c6c7 100644[m
[1m--- a/client/src/index.js[m
[1m+++ b/client/src/index.js[m
[36m@@ -1,17 +1,12 @@[m
 import React from 'react';[m
 import { createRoot } from 'react-dom/client';[m
 import axios from 'axios';[m
[31m-[m
 import reportWebVitals from './reportWebVitals';[m
 import { AuthProvider } from './AuthContext';[m
[31m-[m
[31m-import './Style.css';[m
 import App from './App';[m
 [m
[31m-// Ensure the environment variable is correctly set in your .env file[m
 const baseURL = process.env.REACT_APP_API_URL;[m
 [m
[31m-// Create axios instance with baseURL from environment variable[m
 const axiosInstance = axios.create({[m
   baseURL: baseURL,[m
   timeout: 5000,[m
[36m@@ -21,9 +16,8 @@[m [mconst axiosInstance = axios.create({[m
   },[m
 });[m
 [m
[31m-console.log('API URL:', baseURL); // Log the API URL to console[m
[31m-console.log('axiosInstance:', axiosInstance); // Log the API URL to console[m
[31m-[m
[32m+[m[32mconsole.log('API_BASE_URL:', baseURL); // Log the API_BASE_URL to console[m
[32m+[m[32mconsole.log('axiosInstance:', axiosInstance); // Log the axiosInstance to console[m
 [m
 const root = createRoot(document.getElementById('root'));[m
 [m
