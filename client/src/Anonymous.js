import React, { useState, useEffect } from 'react';
import { useAnonymousUser } from '../contexts/AnonymousUserContext';
import axiosInstance from '../API/axiosInstance';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Assuming you use the same CSS

const Anonymous = () => {
    const { anonymousId } = useAnonymousUser();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axiosInstance.get('/api/channels/', {
                    params: { anonymousId }
                });
                setChannels(response.data);
            } catch (error) {
                console.error('Error fetching channels:', error);
            }
        };

        fetchChannels();
    }, [anonymousId]);

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    const handleCreateChannel = async (name, description) => {
        try {
            const response = await axiosInstance.post('/api/channels/', {
                name,
                description,
                anonymousId
            });
            setChannels([...channels, response.data]);
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    };

    const handleBeforeUnload = (event) => {
        // Prompt user to create an account to save data
        event.preventDefault();
        event.returnValue = 'You will lose your data if you leave. Please create an account to save your data.';
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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
                <div>
                    <h3>Create New Channel</h3>
                    {/* Form to create channels */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const name = e.target.name.value;
                        const description = e.target.description.value;
                        handleCreateChannel(name, description);
                    }}>
                        <input type="text" name="name" placeholder="Channel Name" required />
                        <input type="text" name="description" placeholder="Channel Description" required />
                        <button type="submit">Create Channel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Anonymous;
