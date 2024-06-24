import React from 'react';
// import { useAuth } from './AuthContext'; // Import useAuth hook

const LogoutButton = () => {
    const { logout } = useAuth(); // Destructure logout function from useAuth hook

    const handleLogout = () => {
        logout(); // Call logout function when button is clicked
    };

    return (
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
    );
};

export default LogoutButton;
