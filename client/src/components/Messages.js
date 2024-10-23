import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../API/axiosInstance';

const Messages = () => {
    const { user, guestId } = useAuth(); // Get user and guestId from context
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Determine the appropriate endpoint based on user authentication status
                const endpoint = user 
                    ? `/api/messages/channels/${user.channelId}` // For authenticated user
                    : `/api/messages/guest/${guestId}`; // For guest user
                
                const response = await axiosInstance.get(endpoint);
                
                // Check if the response is successful
                if (response.status === 200) {
                    setMessages(response.data); // Set messages if the response is successful
                } else {
                    setError(`Failed to fetch messages: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error fetching messages: ${error.message}`);
            }
        };

        // Only fetch if guestId is available or if the user is authenticated
        if (guestId || (user && user.channelId)) { 
            fetchMessages();
        } else {
            setError('Guest ID is not available or user is not authenticated.');
        }
    }, [user, guestId]); // Dependencies to re-fetch if user or guestId changes

    return (
        <div>
            {error && <p className="error">{error}</p>} {/* Display error message if it exists */}
            <ul>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message.id}>{message.content}</li> // Display each message
                    ))
                ) : (
                    <li>No messages available.</li> // Message when no messages exist
                )}
            </ul>
        </div>
    );
};

export default Messages;
