import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const App = ({ axiosInstance }) => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login axiosInstance={axiosInstance} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard axiosInstance={axiosInstance} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile axiosInstance={axiosInstance} /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
