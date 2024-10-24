import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile'; // Import UserProfile component
import Nav from './Nav'; // Assuming Nav is in the same directory or adjust the path as per your structure

import './Header.css'; // Import the CSS file for styling

const Header = ({ isSidebarOpen }) => {
    const { user } = useAuth(); // Access user and other auth-related methods from AuthContext

    return (
        <header className={`header ${isSidebarOpen ? 'expanded' : 'contracted'}`}>
            {/* Conditional rendering based on user authentication */}
            {user ? (
                <div className='UserProfile'>
                    {/* Render UserProfile component if user is logged in */}
                    <UserProfile />
                </div>
            ) : null}

            <nav className='navbar'>
                <Nav /> {/* Add other header links as needed */}
            </nav>
        </header>
    );
};

export default Header;
