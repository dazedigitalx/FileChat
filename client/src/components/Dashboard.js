import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Importing useAuth from AuthContext
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat'; // Import Chat component
import './Dashboard.css'; // Ensure correct import path for CSS
import './Style.css'; // Ensure correct import path for CSS


const Dashboard = () => {
    const { user } = useAuth(); // Accessing user from AuthContext
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null); // State to track active channel
    const [channels, setChannels] = useState([]); // State to store channels

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to handle selecting a channel
    const handleChannelSelect = (channel) => {
        setActiveChannel(channel); // Update active channel state
    };

    // Function to handle creating a new channel
    const handleCreateChannel = (newChannel) => {
        setChannels([...channels, newChannel]); // Update channels state with the new channel
    };

    return (
        <div className="dashboard">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                channels={channels}
                onChannelSelect={handleChannelSelect}
            />
            <div className={`dashboard-content ${sidebarOpen ? 'expanded' : ''}`}>
                <Header />
                <div className={`dashboard-main ${sidebarOpen ? '' : 'contracted'}`}>
                    <h2>Welcome to Dashboard</h2>
                    {activeChannel && <Chat channelId={activeChannel.id} user={user} />} {/* Render Chat component if activeChannel is set */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
