import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header'; // Header component
import Sidebar from './Sidebar'; // Sidebar component
import Chat from './Chat'; // Chat component
import './Dashboard.css'; // Import the CSS file for styling
import './Common.css'; // Import reusable common styles

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
    const [activeChannel, setActiveChannel] = useState(null); // Active channel state

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Toggle the sidebar
    };

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel); // Update the active channel state
    };

    return (
        <div className="dashboard">
            {/* Main section with content */}
            <main className="main-layout">
                {/* Header at the top */}
                <header>
                    <Header />
                </header>
                
                {/* Main content area with sidebar nested */}
                <div className="content-area">
                    {/* Sidebar on the left */}
                    <div className={`sidebarX ${isSidebarOpen ? 'expanded' : 'contracted'}`}>
                        <Sidebar
                            isSidebarOpen={isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                            onChannelSelect={handleChannelSelect}
                        />
                    </div>

                    {/* Main chat content area */}
                    <div className={`content ${isSidebarOpen ? 'expanded' : 'contracted'}`}>
                        {activeChannel ? (
                            <Chat channel={activeChannel} />
                        ) : (
                            <p>Please select a channel to start chatting.</p>
                        )}
                    </div>

                    {/* Secondary aside section (optional, for widgets/extra content) */}
                    <aside className={`aside ${isSidebarOpen ? 'expanded' : 'contracted'}`}>

                        {/* Any additional content or widgets can go here */}
                        <p>Additional widgets or information can go here.</p>
                    </aside>
                </div>
                </main>
           <footer className="footer">
            {/* Add footer content here */}
            <p>&copy; 2024 Your Application</p>
             </footer>

        </div>
    );
};

export default Dashboard;
