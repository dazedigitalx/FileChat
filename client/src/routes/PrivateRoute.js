import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Optionally handle loading state
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
