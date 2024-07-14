import React, { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance'; // Ensure this points to the correct URL

const Guest = () => {
    const [channels, setChannels] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Function to fetch channels from the server
    const fetchChannels = async () => {
        try {
            const response = await axiosInstance.get('/api/anonymous', {
                params: { anonymousId: localStorage.getItem('anonymousId') }
            });
            setChannels(response.data); // Ensure this is an array
        } catch (err) {
            console.error('Error fetching channels:', err);
            if (err.response && err.response.status === 404) {
                setError('Channels not found.');
            } else if (err.message.includes('CORS')) {
                setError('CORS error. Please check server settings.');
            } else {
                setError('Failed to fetch channels.');
            }
        }
    };
    
    const createChannel = async () => {
        try {
            const response = await axiosInstance.post('/api/anonymous', {
                name,
                description,
                anonymousId: localStorage.getItem('anonymousId')
            });
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
    
    useEffect(() => {
        let anonymousId = localStorage.getItem('anonymousId');
        if (!anonymousId) {
            anonymousId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('anonymousId', anonymousId);
        }

        fetchChannels();

        // Optionally, you might want to keep `anonymousId` in localStorage across sessions.
        // Cleanup function to remove `anonymousId` on unmount (optional)
        return () => {
            // localStorage.removeItem('anonymousId'); // Uncomment if you want to remove `anonymousId` on unmount
        };
    }, []);

    return (
        <div>
            <h1>Guest Page</h1>
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

            {error && <p>{error}</p>}

            <ul>
                {channels.length > 0 ? (
                    channels.map(channel => (
                        <li key={channel._id}>
                            {channel.name}: {channel.description}
                        </li>
                    ))
                ) : (
                    <p>No channels available.</p> // Provide feedback if no channels exist
                )}
            </ul>
        </div>
    );
};

export default Guest;
