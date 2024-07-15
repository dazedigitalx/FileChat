import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Import the external CSS file
import axiosInstance from '../API/axiosInstance'; // Import your axiosInstance

const Chat = ({ channel }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Reference to scroll to the bottom

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Ensure this is set in your .env file

    useEffect(() => {
        const fetchMessages = async () => {
            setError(null);

            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Token not available.');

                const response = await axiosInstance.get(`${API_BASE_URL}/api/messages/channels/${channel._id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setMessages(response.data);
            } catch (error) {
                setError(`Error fetching messages: ${error.response?.data?.message || error.message}`);
            }
        };

        if (channel) {
            fetchMessages();
        }
    }, [channel, API_BASE_URL]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('Token not available.');
            if (!newMessage.trim()) throw new Error('Message content is required.');

            const messagePayload = {
                channel_id: channel._id,
                content: newMessage,
                user_id: channel.creator_id,
            };

            const response = await axiosInstance.post(`${API_BASE_URL}/api/messages/channels/${channel._id}/send`, messagePayload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage('');
        } catch (error) {
            setError(`Error sending message: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('Token not available.');

            await axiosInstance.delete(`${API_BASE_URL}/api/messages/${messageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
        } catch (error) {
            setError(`Error deleting message: ${error.response?.data?.message || error.message}`);
        }
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (error) {
        return <div className="chat-container">Error: {error}</div>;
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                {channel.name}
            </div>
            <ul className="message-list">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message._id} className="message-item">
                            <div className="message-details">
                                <p className="message-content">{message.content}</p>
                                <div className="message-metadata">
                                    <p>{`Creator ID: ${channel.creator_id}`}</p>
                                    <p>{`Created At: ${new Date(message.created_at).toLocaleString()}`}</p>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteMessage(message._id)}
                                >
                                    x
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No messages available</p>
                )}
                <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
            </ul>
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
