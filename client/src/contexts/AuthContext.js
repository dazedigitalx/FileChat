import React, { useEffect, useState, createContext, useContext } from 'react';
import axiosInstance from '../API/axiosInstance'; // Adjust path based on your structure
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCurrentUser = async (token) => {
        try {
            const response = await axiosInstance.get('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUser(response.data);
                setError('');
            } else {
                setError(`Failed to fetch user details: ${response.statusText}`);
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
            const response = await axiosInstance.post('/api/users/login', credentials);
            const data = response.data;
            if (response.status === 200) {
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
