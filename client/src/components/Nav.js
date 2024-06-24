import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Nav.css';

const Nav = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        logout();
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="nav">
            <ul>

                <li>
                    <Link
                        to="/dashboard"
                        className={`nav-link ${isActive('/dashboard') ? (user ? 'auth-active' : 'active') : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        className={`nav-link ${isActive('/profile') ? (user ? 'auth-active' : 'active') : ''}`}
                    >
                        Profile
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="nav-link">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
