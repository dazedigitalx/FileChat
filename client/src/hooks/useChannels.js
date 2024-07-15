import { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

const useChannels = () => {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axiosInstance.get('/api/channels', {
                    headers: {
                        Authorization: `Bearer ${user ? user.token : ''}`,
                    },
                });
                setChannels(response.data);
            } catch (err) {
                console.error('Error fetching channels:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized. Please log in.');
                } else if (err.response && err.response.status === 404) {
                    setError('Channels not found.');
                } else if (err.message.includes('CORS')) {
                    setError('CORS error. Please check server settings.');
                } else {
                    setError('Failed to fetch channels.');
                }
            }
        };

        if (user) {
            fetchChannels();
        }
    }, [user]);

    return { channels, setChannels, error, setError };
};

export default useChannels;
