import React from 'react';
import './Sidebar.css'; // Adjust styles as needed
import Channels from './Channels'; // Import Channels component

const Sidebar = ({ isOpen, toggleSidebar, channels, onChannelSelect }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? 'Collapse' : 'Expand'}
            </button>
            <ul className="menu">
                <li>Menu Item 3</li>
                <Channels channels={channels} onChannelSelect={onChannelSelect} />
            </ul>
        </div>
    );
};

export default Sidebar;
