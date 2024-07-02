import React, { useState, useEffect } from 'react';
import './Chat.css'; // Import the external CSS file

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
        return <div className="chat-container">Loading messages...</div>;
    }

    if (error) {
        return <div className="chat-container">Error: {error}</div>;
    }

    return (
        <div className="chat-container">
            <h2>Chat for {channel.name}</h2>
            <ul className="message-list">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message._id} className="message-item">
                            <div className="message-details">
                                <p className="message-content">{message.content}</p>
                                <div className="message-metadata">
                                    <p>{`Sent by ${message.sender_name} on ${new Date(message.createdAt).toLocaleString()}`}</p>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteMessage(message._id)}
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No messages available</p>
                )}
            </ul>

            <h3>Send Message</h3>
            <form className="send-message-form" onSubmit={handleSendMessage}>
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
