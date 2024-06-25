import React from 'react';
import Channels from './Channels'; // Import Channels component
import './Sidebar.css'; // Adjust styles as needed
import './Style.css'; // Adjust styles as needed


const Sidebar = ({ isOpen, toggleSidebar, channels, onChannelSelect }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? 'Collapse' : 'Expand'}
            </button>
            <ul className="menu">
                <li></li>
                <Channels channels={channels} onChannelSelect={onChannelSelect} />
            </ul>
        </div>
    );
};

export default Sidebar;
