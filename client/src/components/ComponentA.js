import React, { useState } from 'react';
import ComponentB from './ComponentB';
import Chat from './Chat'; // Import the Chat component

const ComponentA = () => {
    const [isChatActive, setIsChatActive] = useState(false); // State to track if Chat is active

    // Function to toggle Chat component
    const handleChannelSelect = () => {
        setIsChatActive(!isChatActive);
    };

    return (
        <div>
            <h1>Welcome to Component A</h1>
            <ComponentB activateFunction={handleChannelSelect} />
            {isChatActive && <Chat />} {/* Render Chat component if isChatActive is true */}

        </div>
    );
};

export default ComponentA;
