import React, { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance'; // Ensure correct path to your axiosInstance

const Channels = ({ onChannelSelect = () => {}, onCreateChannel = () => {}, activeChannel }) => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelDescription, setNewChannelDescription] = useState('');

    // Fetch channels on component mount
    useEffect(() => {
        const fetchChannels = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get('/api/channels');
                setChannels(response.data);
            } catch (error) {
                setError(`Error fetching channels: ${error.message}`);
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, []); // Empty dependency array means this effect runs once on mount

    // Handle creating a new channel
    const handleCreateChannel = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!newChannelName || !newChannelDescription) {
                throw new Error('Channel Name and Description are required.');
            }

            const response = await axiosInstance.post('/api/channels', {
                name: newChannelName,
                description: newChannelDescription
            });

            setChannels([...channels, response.data]);
            onCreateChannel(response.data);
            setNewChannelName('');
            setNewChannelDescription('');
        } catch (error) {
            setError(`Error creating channel: ${error.message}`);
            console.error('Error creating channel:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle channel click
    const handleChannelClick = (channel) => {
        onChannelSelect(channel);
    };

    // Handle deleting a channel
    const handleDeleteChannel = async (channelId) => {
        if (window.confirm('Are you sure you want to delete this channel?')) {
            setLoading(true);
            setError(null);

            try {
                await axiosInstance.delete(`/api/channels/${channelId}`);
                setChannels(channels.filter(channel => channel._id !== channelId));
            } catch (error) {
                setError(`Error deleting channel: ${error.message}`);
                console.error('Error deleting channel:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading channels...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Channels</h2>
            <ul>
                {channels.length > 0 ? (
                    channels.map(channel => (
                        <li key={channel._id} className={activeChannel?._id === channel._id ? 'active' : ''}>
                            <div className="channel-info" onClick={() => handleChannelClick(channel)}>
                                <span>{channel.name} - {channel.description}</span>
                            </div>
                            <div className="delete-button-container">
                                <button
                                    className="delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering channel select
                                        handleDeleteChannel(channel._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No channels available.</p>
                )}
            </ul>

            <h3>Create New Channel</h3>
            <form onSubmit={handleCreateChannel}>
                <input
                    type="text"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Create Channel Name"
                    required
                />
                <input
                    type="text"
                    value={newChannelDescription}
                    onChange={(e) => setNewChannelDescription(e.target.value)}
                    placeholder="Channel Description"
                    required
                />
                <button type="submit">Create Channel</button>
            </form>
        </div>
    );
};

export default Channels;
