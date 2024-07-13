import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Update the path according to your project structure
import axiosInstance from '../API/axiosInstance'; // Import the configured Axios instance
import './Channels.css'; // Import the external CSS file

const Channels = ({ onChannelSelect = () => {}, onCreateChannel = () => {}, activeChannel }) => {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelDescription, setNewChannelDescription] = useState('');

    useEffect(() => {
        if (!user) return;

        const fetchUserChannels = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = user?.token || localStorage.getItem('accessToken');

                if (!token) {
                    throw new Error('Token not available.');
                }

                const response = await axiosInstance.get('/api/channels/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setChannels(response.data);
            } catch (error) {
                setError(`Error fetching channels: ${error.message}`);
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserChannels();
    }, [user]);

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = user?.token || localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Token not available.');
            }

            if (!newChannelName || !newChannelDescription) {
                throw new Error('Channel Name and Description are required.');
            }

            const response = await axiosInstance.post('/api/channels/', {
                name: newChannelName,
                description: newChannelDescription,
                creator_id: user.id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const newChannel = response.data;

            setChannels([...channels, newChannel]);
            onCreateChannel(newChannel);
            setNewChannelName('');
            setNewChannelDescription('');

            console.log('Created Channel:', newChannel._id, 'User ID:', user.id);
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
        try {
            const token = user?.token || localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Token not available.');
            }

            const response = await axiosInstance.delete(`/api/channels/${channelId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setChannels(channels.filter(c => c._id !== channelId));
            }
        } catch (error) {
            console.error('Error deleting channel:', error);
            setError(`Error deleting channel: ${error.message}`);
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

export default Channels;
