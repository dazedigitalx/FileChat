// client/src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Corrected import to use useAuth hook

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner
  }

  return user ? children : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
