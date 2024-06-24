import React, { useState } from 'react';
import Chat from './Chat'; // Assuming Chat component is correctly imported

const ChannelList = ({ channels, onSelect }) => {
    const [activeChannel, setActiveChannel] = useState(null); // State to track active channel

    const handleChannelClick = (channel) => {
        setActiveChannel(channel); // Set the clicked channel as active
        onSelect(channel); // Pass selected channel to parent component
    };

    return (
        <div>
            <h2>Your Channels</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id} onClick={() => handleChannelClick(channel)}>
                        {channel.name} - {channel.description}
                    </li>
                ))}
            </ul>

            {activeChannel && (
                <Chat channelId={activeChannel.id} />
            )}
        </div>
    );
};

export default ChannelList;
