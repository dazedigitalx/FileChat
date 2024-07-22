import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling

const Guest = () => {
    // State to manage sidebar visibility
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    // State to manage the currently active channel
    const [activeChannel, setActiveChannel] = useState(null);

    // Function to toggle the sidebar's visibility
    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    // Function to handle channel selection
    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    return (
        <div className="dashboard">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onChannelSelect={handleChannelSelect} // Pass the function to Sidebar
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                <div>
                    <h1>Guest Page</h1>
                    {activeChannel ? (
                        <Chat channel={activeChannel} /> // Display Chat if a channel is selected
                    ) : (
                        <p>Select a channel to start chatting</p> // Prompt user to select a channel
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guest;
