import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../API/axiosInstance'; // Import the axios instance

const Guest = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);

    useEffect(() => {
        // Generate a unique guest ID and save it to cookies
        let guestId = Cookies.get('guestId');
        if (!guestId) {
            guestId = uuidv4();
            Cookies.set('guestId', guestId, { expires: 365 }); // Set expiry as needed
        }

        // Optionally fetch channels or perform other actions using guestId
        axiosInstance.get('/api/guest', { params: { guestId } })
            .then(response => {
                // Handle response
            })
            .catch(error => {
                console.error('Error fetching guest channels:', error);
            });

    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    return (
        <div className="dashboard">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onChannelSelect={handleChannelSelect}
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
