import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAnonymousUser } from '../contexts/AnonymousUserContext';

const ChannelsAnonymous = () => {
    const { anonymousId } = useAnonymousUser();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChannels = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/api/channels/anonymous', {
                    params: { anonymousId }
                });
                setChannels(response.data);
            } catch (error) {
                setError(`Error fetching channels: ${error.response?.data?.error || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [anonymousId]);

    if (loading) return <div>Loading channels...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Channels for Anonymous Users</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel._id}>{channel.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelsAnonymous;
