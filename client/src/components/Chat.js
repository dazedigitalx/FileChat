// Chat.js

import React, { useState, useEffect } from 'react';

const Chat = ({ channel }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('accessToken');

                if (!token) {
                    throw new Error('Token not available.');
                }

                const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Please login again.');
                    }
                    throw new Error(`Failed to fetch messages: ${response.statusText}`);
                }

                const data = await response.json();
                setMessages(data); // Assuming data is an array of messages
            } catch (error) {
                setError(`Error fetching messages: ${error.message}`);
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (channel) {
            fetchMessages();
        }
    }, [channel]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Token not available.');
            }

            if (!newMessage.trim()) {
                throw new Error('Message content is required.');
            }

            const messagePayload = {
                channel_id: channel._id,
                content: newMessage,
                user_id: channel.creator_id
            };

            const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messagePayload),
            });

            if (!response.ok) {
                let errorMessage = `Failed to send message: ${response.statusText}`;
                if (response.status === 401) {
                    errorMessage = 'Unauthorized: Please login again.';
                } else if (response.status === 404) {
                    errorMessage = 'Endpoint not found: Check the URL and method.';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error: Please try again later.';
                }
                throw new Error(errorMessage);
            }

            const newMessageData = await response.json();
            setMessages([...messages, newMessageData]);
            setNewMessage('');

            console.log('Sent Message ID:', newMessageData._id);
        } catch (error) {
            setError(`Error sending message: ${error.message}`);
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            console.log('Deleting Message ID:', messageId);
    
            const token = localStorage.getItem('accessToken');
    
            if (!token) {
                throw new Error('Token not available.');
            }
    
            const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                let errorMessage = `Failed to delete message: ${response.statusText}`;
                if (response.status === 400) {
                    const errorData = await response.json(); // Assuming server returns JSON error details
                    errorMessage = `Bad Request: ${errorData.error}`;
                } else if (response.status === 401) {
                    errorMessage = 'Unauthorized: Please login again.';
                } else if (response.status === 404) {
                    errorMessage = 'Message not found.';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error: Please try again later.';
                }
                throw new Error(errorMessage);
            }
    
            console.log('Deleted Message ID:', messageId);
    
            // Update UI to remove the deleted message from state
            setMessages(messages.filter(message => message._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            setError(`Error deleting message: ${error.message}`);
        }
    };
    
    
    
    

    if (loading) {
        return <div>Loading messages...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Chat for {channel.name}</h2>
            <ul>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message._id}>
                            <p>{message.content}</p>
                            <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No messages available</p>
                )}
            </ul>

            <h3>Send Message</h3>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
