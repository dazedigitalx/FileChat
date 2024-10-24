import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header'; // Header component
import Sidebar from './Sidebar'; // Sidebar component
import Chat from './Chat'; // Chat component
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel); // Update the active channel state
    };

    return (
        <div className="dashboard">
            <Header /> {/* Ensure header is outside the sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onChannelSelect={handleChannelSelect} // Pass handleChannelSelect to Sidebar
            />
            <div className={`content ${isSidebarOpen ? 'expanded' : 'contracted'}`}>
                {activeChannel && <Chat channel={activeChannel} />}
            </div>
        </div>
    );
};

export default Dashboard;
