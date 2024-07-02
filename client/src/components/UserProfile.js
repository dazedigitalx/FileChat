import React from 'react';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user, loading, error } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Error: User not found</div>;
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
