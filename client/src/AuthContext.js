import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCurrentUser = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setError('');
            } else {
                const errorData = await response.json();
                setError(`Failed to fetch user details: ${errorData.message}`);
            }
        } catch (error) {
            setError('Failed to fetch user. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const validateToken = async () => {
        const storedToken = localStorage.getItem('accessToken') || Cookies.get('accessToken');
        if (storedToken) {
            setLoading(true);
            await fetchCurrentUser(storedToken);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', data.token);
                Cookies.set('accessToken', data.token, { expires: 7 });
                await fetchCurrentUser(data.token);
                setError('');
            } else {
                setError('Login failed: ' + data.message);
            }
        } catch (error) {
            setError('Login error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        Cookies.remove('accessToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
