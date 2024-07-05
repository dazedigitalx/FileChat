import React from 'react';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
<div class="UserProfile">
            <h2>User Profile</h2>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
