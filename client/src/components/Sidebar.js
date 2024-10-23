import React, { useState } from 'react';
import useChannelsGuest from '../hooks/useChannelsGuest'; // Change hook import from anonymous to guest
import useChannels from '../hooks/useChannels'; // Keep this as is for authenticated channels
import { useAuth } from '../contexts/AuthContext'; // Import the authentication context
import axiosInstance from '../API/axiosInstance'; // Ensure correct import path for axios instance
import './Sidebar.css'; // Ensure correct import path for CSS
import '../Style.css'; // Ensure correct import path for CSS

const Sidebar = ({ isSidebarOpen, toggleSidebar, onChannelSelect }) => {
    const { user } = useAuth(); // Use authentication context to check if the user is authenticated
    const [activeChannel, setActiveChannel] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Fetch channels based on user authentication status
    const { channels: guestChannels, error: guestError, setChannels: setGuestChannels, setError: setGuestError } = useChannelsGuest();
    const { channels: authChannels, error: authError, setChannels: setAuthChannels, setError: setAuthError } = useChannels();

    const channels = user ? authChannels : guestChannels; // Updated variable name from anonymousChannels to guestChannels
    const setChannels = user ? setAuthChannels : setGuestChannels; // Updated variable name from setAnonymousChannels to setGuestChannels
    const setError = user ? setAuthError : setGuestError; // Updated variable name from setAnonymousError to setGuestError
    const error = user ? authError : guestError; // Updated variable name from anonymousError to guestError

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
        onChannelSelect(channel); // Pass the selected channel to the Dashboard
    };

    const createChannel = async () => {
        try {
            const endpoint = user ? '/api/channels' : '/api/guest'; // Updated endpoint for guest
            const payload = { name, description };
            if (!user) {
                payload.guestId = localStorage.getItem('guestId'); // Update key from anonymousId to guestId
            }
            const response = await axiosInstance.post(endpoint, payload);
            setChannels(prevChannels => [...prevChannels, response.data]);
            setName('');
            setDescription('');
        } catch (err) {
            console.error('Error creating channel:', err);
            if (err.response && err.response.status === 404) {
                setError('Channel creation failed. Endpoint not found.');
            } else if (err.message.includes('CORS')) {
                setError('CORS error. Please check server settings.');
            } else {
                setError('Failed to create channel.');
            }
        }
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isSidebarOpen ? 'Collapse' : '='}
            </button>
            
            {error && <p className="error">{error}</p>}

            <ul className="menu">
                {channels.map(channel => (
                    <li key={channel._id} onClick={() => handleChannelSelect(channel)}>
                        {channel.name}: {channel.description}
                    </li>
                ))}
            </ul>

            <div className="create-channel">
                <h3>Create New Channel</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Channel Name"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Channel Description"
                />
                <button
                    onClick={createChannel}
                    disabled={!name || !description} // Disable button if inputs are empty
                >
                    Create Channel
                </button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Sidebar;
