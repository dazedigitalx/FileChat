import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
// import '../Style.css'; // Import the external CSS file
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
                let token = user?.token || localStorage.getItem('accessToken');

                if (!token) {
                    throw new Error('Token not available.');
                }

                const response = await fetch('http://localhost:5000/api/channels/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Please login again.');
                    }
                    throw new Error(`Failed to fetch channels: ${response.statusText}`);
                }

                const data = await response.json();
                setChannels(data);
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
            let token = user?.token || localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Token not available.');
            }

            if (!newChannelName || !newChannelDescription) {
                throw new Error('Channel Name and Description are required.');
            }

            const response = await fetch('http://localhost:5000/api/channels/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newChannelName,
                    description: newChannelDescription,
                    creator_id: user.id
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please login again.');
                }
                throw new Error(`Failed to create channel: ${response.statusText}`);
            }

            const newChannel = await response.json();

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
            let token = user?.token || localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Token not available.');
            }

            const response = await fetch(`http://localhost:5000/api/channels/${channelId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Please login again.');
                }
                throw new Error(`Failed to delete channel: ${response.statusText}`);
            }

            setChannels(channels.filter(c => c._id !== channelId));
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
                            <button onClick={() => handleDeleteChannel(channel._id)}>x</button>
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
