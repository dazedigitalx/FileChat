import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../API/axiosInstance'; // Import your axiosInstance

const Guest = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Generate a unique guest ID and save it to cookies
        let guestId = Cookies.get('guestId');
        if (!guestId) {
            guestId = uuidv4();
            Cookies.set('guestId', guestId, { expires: 365 }); // Set expiry as needed
        }

        // Fetch channels for the guest
        const fetchChannels = async () => {
            try {
                const response = await axiosInstance.get('/api/anonymous', {
                    params: { guestId }
                });
                setChannels(response.data);
            } catch (error) {
                setError(`Error fetching channels: ${error.message}`);
            }
        };

        fetchChannels();
    }, []); // Empty dependency array ensures this runs once when the component mounts

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
                channels={channels} // Pass channels to Sidebar if needed
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                <div>
                    <h1>Guest Page</h1>
                    {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
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
