import { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';

const useChannelsAnonymous = () => {
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axiosInstance.get('/api/anonymous', {
                    params: { anonymousId: localStorage.getItem('anonymousId') }
                });
                setChannels(response.data);
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

        fetchChannels();
    }, []);

    return { channels, setChannels, error, setError };
};

export default useChannelsAnonymous;
