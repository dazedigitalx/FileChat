import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling

const Guest = () => {
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
                <div>
                    <h1>Guest Page</h1>
                    {activeChannel ? (
                        <Chat channel={activeChannel} />
                    ) : (
                        <p>Select a channel to start chatting</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guest;
