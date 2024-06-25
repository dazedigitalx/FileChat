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
                let token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage

                if (!token) {
                    throw new Error('Token not available.');
                }

                const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/messages`, {
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
                console.error('Error fetching messages:', error); // Log detailed error information
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
            let token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage

            if (!token) {
                throw new Error('Token not available.');
            }

            // Basic validation
            if (!newMessage.trim()) {
                throw new Error('Message content is required.');
            }

            const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newMessage,
                    user_id: channel.creator_id // Assuming channel creator ID is used as user_id
                }),
            });

            if (!response.ok) {
                let errorMessage = `Failed to send message: ${response.statusText}`;
                if (response.status === 401) {
                    errorMessage = 'Unauthorized: Please login again.';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error: Please try again later.';
                }
                throw new Error(errorMessage);
            }

            const newMessageData = await response.json();

            // Update messages state with the new message
            setMessages([...messages, newMessageData]);

            // Clear input field after successful sending
            setNewMessage('');

            console.log('Sent Message:', newMessageData.id); // Log new message ID
        } catch (error) {
            setError(`Error sending message: ${error.message}`);
            console.error('Error sending message:', error); // Log detailed error information
        } finally {
            setLoading(false);
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
                {Array.isArray(messages) && messages.map(message => (
                    <li key={message._id}>
                        {message.content} - {message.user_id}
                    </li>
                ))}
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
