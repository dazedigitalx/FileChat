import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import UserProfile from './UserProfile'
import './Dashboard.css'; // Ensure correct import path for CSS

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="dashboard">
            <div className={`dashboard-content ${sidebarOpen ? 'expanded' : ''}`}>
                <Header />
                <div className={`dashboard-main ${sidebarOpen ? '' : 'contracted'}`}>
                    <h2>This is Profile page</h2>
                    <UserProfile />
                    <p>Main content...</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
