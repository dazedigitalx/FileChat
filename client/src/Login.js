import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';


import './Login.css';
import './Style.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = ({ axiosInstance }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStep(2);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password) {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        console.log('Login form submitted');
        console.log('Email:', email);
        // console.log('Password:', password);
    
        // Ensure axiosInstance is defined before proceeding
        if (!axiosInstance) {
            console.error('axiosInstance is undefined!');
            console.log('axiosInstance:', axiosInstance);

            return;
        }
    
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/api/users/login`, { email, password });
            const responseData = response.data;
            console.log('Response data:', responseData);
    
            if (response.status === 200) {
                const { token, id, email, username } = responseData;
                console.log('User data:', { id, email, username });
                setUser({ id, email, username, token });
                localStorage.setItem('accessToken', token);
                setMessage('User logged in successfully');
                setError('');
    
                navigate('/dashboard');
            } else {
                setError(`Failed to login: ${responseData.message}`);
                console.error('Login failed:', responseData.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(`Error logging in. Please try again later. Details: ${error.message}`);
        }
    };
    
    return (
        <div className="login-page">
            <div className="login-hero-image"></div>
            <div className="login-form-container">
                <div className="login-box">
                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Next</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    )}
                    <div className="register-link">
                        <span>Don't have an account?</span>
                        <Link to="/signup" className="register-button">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
