import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axiosInstance from '../src/API/axiosInstance'; // Import axiosInstance
import './Login.css';
import './Style.css';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [emailReadOnly, setEmailReadOnly] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Using environment file:', process.env.NODE_ENV);
        console.log('API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
    }, []);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setShowNextButton(enteredEmail.includes('@'));
    };

    const handleNext = () => {
        setEmailReadOnly(true);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password && !loading) {
            setLoading(true);
            await handleLogin();
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/api/users/login', { email, password });

            if (response.status === 200) {
                const { token, id, username } = response.data;
                setUser({ id, email, username, token });
                localStorage.setItem('accessToken', token);
                setMessage('User logged in successfully');
                setError('');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(`Error logging in. Details: ${error.response ? error.response.data.message : error.message}`);
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
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            readOnly={emailReadOnly}
                            required
                        />
                        {!emailReadOnly && showNextButton && (
                            <button type="button" className="continue-button" onClick={handleNext}>Continue</button>
                        )}
                        {emailReadOnly && (
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        )}
                        {emailReadOnly && (
                            <button type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        )}
                    </form>
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
