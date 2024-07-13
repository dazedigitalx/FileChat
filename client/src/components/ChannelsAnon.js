import React, { useState, useEffect } from 'react';
import { useAnonymousUser } from '../contexts/AnonymousUserContext';
import axiosInstance from '../API/axiosInstance'; // Update with your axios instance

const AnonChannels = ({ onChannelSelect = () => {}, onCreateChannel = () => {}, activeChannel }) => {
    const { anonymousId } = useAnonymousUser();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelDescription, setNewChannelDescription] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get('/api/channels/', {
                    params: { anonymousId }
                });
                setChannels(response.data);
            } catch (error) {
                setError(`Error fetching channels: ${error.message}`);
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [anonymousId]);

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!newChannelName || !newChannelDescription) {
                throw new Error('Channel Name and Description are required.');
            }

            const response = await axiosInstance.post('/api/channels/', {
                name: newChannelName,
                description: newChannelDescription,
                anonymousId
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

    const handleChannelClick = (channel) => {
        onChannelSelect(channel);
    };

    const handleDeleteChannel = async (channelId) => {
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.delete(`/api/channels/${channelId}`, {
                params: { anonymousId }
            });

            setChannels(channels.filter(channel => channel._id !== channelId));
        } catch (error) {
            setError(`Error deleting channel: ${error.message}`);
            console.error('Error deleting channel:', error);
        } finally {
            setLoading(false);
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
            <h2>Anonymous Channels</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel._id} className={activeChannel && activeChannel._id === channel._id ? 'active' : ''}>
                        <div className="channel-info" onClick={() => handleChannelClick(channel)}>
                            <span>{channel.name} - {channel.description}</span>
                        </div>
                        <div className="delete-button-container">
                            <button className="delete-button" onClick={() => handleDeleteChannel(channel._id)}>x</button>
                        </div>
                    </li>
                ))}
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

export default AnonChannels;
