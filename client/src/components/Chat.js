import React, { useState, useEffect } from 'react';
import './Chat.css'; // Import the external CSS file

const Chat = ({ channel }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        console.log('API_BASE_URL:', API_BASE_URL);

        const fetchMessages = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('accessToken');
                console.log('Fetching messages for channel:', channel);
                console.log('Using token:', token);

                if (!token) {
                    throw new Error('Token not available.');
                }

                const response = await fetch(`${API_BASE_URL}/api/messages/channels/${channel._id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorMessage = await getErrorMessage(response);
                    throw new Error(`Failed to fetch messages: ${errorMessage}`);
                }

                const data = await response.json();
                setMessages(data);
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
    }, [channel, API_BASE_URL]);

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

            const response = await fetch(`${API_BASE_URL}/api/messages/channels/${channel._id}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messagePayload),
            });

            if (!response.ok) {
                const errorMessage = await getErrorMessage(response);
                throw new Error(`Failed to send message: ${errorMessage}`);
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

            const response = await fetch(`${API_BASE_URL}/api/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await getErrorMessage(response);
                throw new Error(`Failed to delete message: ${errorMessage}`);
            }

            console.log('Deleted Message ID:', messageId);

            setMessages(messages.filter(message => message._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            setError(`Error deleting message: ${error.message}`);
        }
    };

    const getErrorMessage = async (response) => {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (error) {
            console.error('Failed to parse error response:', error);
        }
        return errorMessage;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formattedDate;
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
                                    <p>{`Creator ID: ${channel.creator_id}`}</p>
                                    <p>{`Created At: ${channel.created_at}`}</p>
                                </div>
                                <div className="delete-button-container">
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
