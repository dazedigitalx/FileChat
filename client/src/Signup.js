import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate password and confirm password
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                // Successful signup
                console.log('Signup successful:', response.data.message);
                navigate('/login');
            } else {
                setError(response.data.message || 'Failed to sign up.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Error signing up. Please try again later.');
        }
    };

    return (
        <div className="signup-page">
            <div className="hero-image"></div>
            <div className="signup-form-container">
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className="login-link">
                    <span><br></br></span>

                        <span>Already have an account?</span>
                        <span><br></br></span>

                        <Link to="/login" className="login-button">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
