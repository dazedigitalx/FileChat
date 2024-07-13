import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeChannel, setActiveChannel] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Display a confirmation dialog to the user
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your data will be lost.';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="dashboard">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onChannelSelect={handleChannelSelect} // Pass handleChannelSelect to Sidebar
            />
            <div className={`dashboard-content ${isSidebarOpen ? 'expanded' : ''}`}>
                <Header />
                {activeChannel && <Chat channel={activeChannel} />}
            </div>
        </div>
    );
};

export default Dashboard;
