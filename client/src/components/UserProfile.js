import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCurrentUser = async () => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setError('');
                } else {
                    const errorData = await response.json(); // If server returns error details
                    setError(`Failed to fetch user details: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Fetch user error:', error);
                setError('Failed to fetch user. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []); // Runs once on component mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return null; // or return some default UI if user data is not yet fetched
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
        </div>
    );
};

export default UserProfile;
