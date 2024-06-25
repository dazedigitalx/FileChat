import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Channels from './Channels';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
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
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                <Channels onChannelSelect={handleChannelSelect} activeChannel={activeChannel} />
                {activeChannel && <Chat channel={activeChannel} />}
            </div>
        </div>
    );
};

export default Dashboard;
