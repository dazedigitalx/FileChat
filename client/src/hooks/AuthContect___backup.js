// client/src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const logout = () => {
        // Clear localStorage items
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null); // Update user state to null
        // Redirect to login page or another page after logout
        window.location.href = '/login'; // Example redirect to login page
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/login', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setUser(data); // Assuming response data contains user information
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    setError('Failed to fetch user. Please try again later.');
                }
            } else {
                console.log('No token found');
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
