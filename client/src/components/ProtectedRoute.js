// client/src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Adjust import path as per your structure

const ProtectedRoute = ({ role, element: Element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user && user.role === role ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;
