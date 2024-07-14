// src/components/Anonymous.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';
import { useAnonymousUser } from '../contexts/AnonymousUserContext';
import Header from './Header';
import Sidebar from './Sidebar';
// import Chat from './Chat';
// import ChannelsAnonymous from './ChannelsAnonymous';
import './Dashboard.css';

const Anonymous = () => {
    const { anonymousId } = useAnonymousUser();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [error, setError] = useState(null);

    // Check if user is anonymous
    useEffect(() => {
        const verifyAnonymous = async () => {
            try {
                const response = await axiosInstance.get('/api/verify-anonymous', {
                    params: { anonymousId }
                });
                if (response.status === 200) {
                    setIsAnonymous(true);
                }
            } catch (err) {
                setError('Invalid anonymous ID or unable to verify.');
                setIsAnonymous(false);
            }
        };

        if (anonymousId) {
            verifyAnonymous();
        } else {
            setError('Anonymous ID is missing.');
            setIsAnonymous(false);
        }
    }, [anonymousId]);

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    const handleCreateChannel = async (name, description) => {
        try {
            await axiosInstance.post('/api/channels/anonymous', {
                name,
                description,
                anonymousId
            });
            // Optionally handle channel creation success
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    };

    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = 'You will lose your data if you leave. Please create an account to save your data.';
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!isAnonymous) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                onChannelSelect={handleChannelSelect}
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                {activeChannel && <Chat channel={activeChannel} />}
                <ChannelsAnonymous
                    onChannelSelect={handleChannelSelect}
                    onCreateChannel={handleCreateChannel}
                    activeChannel={activeChannel}
                />
            </div>
        </div>
    );
};

export default Anonymous;
