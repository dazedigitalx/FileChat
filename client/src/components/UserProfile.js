import React from 'react';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
