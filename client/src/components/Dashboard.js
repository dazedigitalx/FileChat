import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    return (
        <div className="dashboard">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onChannelSelect={handleChannelSelect} // Pass handleChannelSelect to Sidebar
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                {activeChannel && <Chat channel={activeChannel} />}
            </div>
        </div>
    );
};

export default Dashboard;
