import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import axiosInstance from '../src/API/axiosInstance'; // Import axiosInstance

const App = ({ axiosInstance }) => {
  console.log('App.js axiosInstance:', axiosInstance);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login axiosInstance={axiosInstance} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard axiosInstance={axiosInstance} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile axiosInstance={axiosInstance} /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
