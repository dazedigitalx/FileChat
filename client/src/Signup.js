import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Signup.css';

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

            if (response.status === 200) {
                // Successful signup, navigate to login page
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
        <div className="card">
            <div className="card-image">
                <div className="card-welcome">
                    <h1>Sign Up</h1>
                </div>
            </div>
            <div className="card-content">
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
            </div>
        </div>
    );
};

export default Signup;
