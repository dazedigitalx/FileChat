[33mcommit 74b56b9d4ccd95b074a2e708ffa266e44c58f9ae[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Interaktika Studio <dazedigital@gmail.com>
Date:   Sun Jun 30 10:12:52 2024 -0400

    send message endpoint confrirmed working in POSTMAN

[1mdiff --git a/client/src/components/Chat.js b/client/src/components/Chat.js[m
[1mindex 31cca7c..1cffe8b 100644[m
[1m--- a/client/src/components/Chat.js[m
[1m+++ b/client/src/components/Chat.js[m
[36m@@ -47,63 +47,70 @@[m [mconst Chat = ({ channel }) => {[m
         }[m
     }, [channel]);[m
 [m
[31m-    const handleSendMessage = async (e) => {[m
[31m-        e.preventDefault();[m
[31m-        setLoading(true);[m
[31m-        setError(null);[m
[32m+[m[32m const handleSendMessage = async (e) => {[m
[32m+[m[32m    e.preventDefault();[m
[32m+[m[32m    setLoading(true);[m
[32m+[m[32m    setError(null);[m
 [m
[31m-        try {[m
[31m-            const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage[m
[32m+[m[32m    try {[m
[32m+[m[32m        const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage[m
 [m
[31m-            if (!token) {[m
[31m-                throw new Error('Token not available.');[m
[31m-            }[m
[32m+[m[32m        if (!token) {[m
[32m+[m[32m            throw new Error('Token not available.');[m
[32m+[m[32m        }[m
 [m
[31m-            // Basic validation[m
[31m-            if (!newMessage.trim()) {[m
[31m-                throw new Error('Message content is required.');[m
[31m-            }[m
[32m+[m[32m        // Basic validation[m
[32m+[m[32m        if (!newMessage.trim()) {[m
[32m+[m[32m            throw new Error('Message content is required.');[m
[32m+[m[32m        }[m
 [m
[31m-            const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/send`, {[m
[31m-                method: 'POST',[m
[31m-                headers: {[m
[31m-                    'Authorization': `Bearer ${token}`,[m
[31m-                    'Content-Type': 'application/json',[m
[31m-                },[m
[31m-                body: JSON.stringify({[m
[31m-                    content: newMessage,[m
[31m-                    user_id: channel.creator_id // Assuming channel creator ID is used as user_id[m
[31m-                }),[m
[31m-            });[m
[31m-[m
[31m-            if (!response.ok) {[m
[31m-                let errorMessage = `Failed to send message: ${response.statusText}`;[m
[31m-                if (response.status === 401) {[m
[31m-                    errorMessage = 'Unauthorized: Please login again.';[m
[31m-                } else if (response.status === 404) {[m
[31m-                    errorMessage = 'Endpoint not found: Check the URL and method.';[m
[31m-                } else if (response.status === 500) {[m
[31m-                    errorMessage = 'Internal Server Error: Please try again later.';[m
[31m-                }[m
[31m-                throw new Error(errorMessage);[m
[32m+[m[32m        const messagePayload = {[m
[32m+[m[32m            channel_id: channel._id,[m
[32m+[m[32m            content: newMessage,[m
[32m+[m[32m            user_id: channel.creator_id // Assuming channel creator ID is used as user_id[m
[32m+[m[32m        };[m
[32m+[m
[32m+[m[32m        console.log('Sending message payload:', messagePayload);[m
[32m+[m
[32m+[m[32m        const response = await fetch(`http://localhost:5000/api/messages/channels/${channel._id}/send`, {[m
[32m+[m[32m            method: 'POST',[m
[32m+[m[32m            headers: {[m
[32m+[m[32m                'Authorization': `Bearer ${token}`,[m
[32m+[m[32m                'Content-Type': 'application/json',[m
[32m+[m[32m            },[m
[32m+[m[32m            body: JSON.stringify(messagePayload),[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m        if (!response.ok) {[m
[32m+[m[32m            let errorMessage = `Failed to send message: ${response.statusText}`;[m
[32m+[m[32m            if (response.status === 401) {[m
[32m+[m[32m                errorMessage = 'Unauthorized: Please login again.';[m
[32m+[m[32m            } else if (response.status === 404) {[m
[32m+[m[32m                errorMessage = 'Endpoint not found: Check the URL and method.';[m
[32m+[m[32m            } else if (response.status === 500) {[m
[32m+[m[32m                errorMessage = 'Internal Server Error: Please try again later.';[m
             }[m
[32m+[m[32m            throw new Error(errorMessage);[m
[32m+[m[32m        }[m
 [m
[31m-            const newMessageData = await response.json();[m
[32m+[m[32m        const newMessageData = await response.json();[m
 [m
[31m-            // Update messages state with the new message[m
[31m-            setMessages([...messages, newMessageData]);[m
[32m+[m[32m        // Update messages state with the new message[m
[32m+[m[32m        setMessages([...messages, newMessageData]);[m
 [m
[31m-            // Clear input field after successful sending[m
[31m-            setNewMessage('');[m
[32m+[m[32m        // Clear input field after successful sending[m
[32m+[m[32m        setNewMessage('');[m
 [m
[31m-            console.log('Sent Message:', newMessageData._id); // Log new message ID[m
[31m-        } catch (error) {[m
[31m-            setError(`Error sending message: ${error.message}`);[m
[31m-            console.error('Error sending message:', error); // Log detailed error information[m
[31m-        } finally {[m
[31m-            setLoading(false);[m
[31m-        }[m
[31m-    };[m
[32m+[m[32m        console.log('Sent Message:', newMessageData._id); // Log new message ID[m
[32m+[m[32m    } catch (error) {[m
[32m+[m[32m        setError(`Error sending message: ${error.message}`);[m
[32m+[m[32m        console.error('Error sending message:', error); // Log detailed error information[m
[32m+[m[32m    } finally {[m
[32m+[m[32m        setLoading(false);[m
[32m+[m[32m    }[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[41m    [m
 [m
     if (loading) {[m
         return <div>Loading messages...</div>;[m
[36m@@ -117,11 +124,20 @@[m [mconst Chat = ({ channel }) => {[m
         <div>[m
             <h2>Chat for {channel.name}</h2>[m
             <ul>[m
[31m-                {Array.isArray(messages) && messages.map(message => ([m
[31m-                    <li key={message._id}>[m
[31m-                        {message.content} - {message.user_id.username}[m
[31m-                    </li>[m
[31m-                ))}[m
[32m+[m[32m                {messages && messages.length > 0 ? ([m
[32m+[m[32m                    messages.map((message, index) => ([m
[32m+[m[32m                        <div key={index}>[m
[32m+[m[32m                            {message.user && message.user.username ? ([m
[32m+[m[32m                                <span>{message.user.username}</span>[m
[32m+[m[32m                            ) : ([m
[32m+[m[32m                                <span>Unknown User</span>[m
[32m+[m[32m                            )}[m
[32m+[m[32m                            <p>{message.content}</p>[m
[32m+[m[32m                        </div>[m
[32m+[m[32m                    ))[m
[32m+[m[32m                ) : ([m
[32m+[m[32m                    <p>No messages available</p>[m
[32m+[m[32m                )}[m
             </ul>[m
 [m
             <h3>Send Message</h3>[m
[1mdiff --git a/server/controllers/channelController.js b/server/controllers/channelController.js[m
[1mindex 30f84e1..bcfb947 100644[m
[1m--- a/server/controllers/channelController.js[m
[1m+++ b/server/controllers/channelController.js[m
[36m@@ -85,21 +85,32 @@[m [mexports.getAllChannels = async (req, res) => {[m
 [m
 [m
     // POST a new channel[m
[31m-    exports.createChannel = async (req, res) => {[m
[31m-        try {[m
[31m-            if (!req.user || !req.user.id) {[m
[31m-                return res.status(401).json({ error: 'User not authenticated' });[m
[31m-            }[m
[31m-[m
[31m-            const { id: creator_id } = req.user;[m
[31m-            const { name, description } = req.body;[m
[31m-[m
[31m-            const newChannel = new Channel({ name, description, creator_id });[m
[31m-            await newChannel.save();[m
[31m-[m
[31m-            res.status(201).json(newChannel);[m
[31m-        } catch (error) {[m
[31m-            console.error('Error creating channel:', error);[m
[31m-            res.status(500).json({ error: 'Error creating channel' });[m
[32m+[m[32m   // POST a new channel[m
[32m+[m[32mexports.createChannel = async (req, res) => {[m
[32m+[m[32m    try {[m
[32m+[m[32m        if (!req.user || !req.user.id) {[m
[32m+[m[32m            return res.status(401).json({ error: 'User not authenticated' });[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        const { id: creator_id } = req.user;[m
[32m+[m[32m        const { name, description } = req.body;[m
[32m+[m
[32m+[m[32m        // Create a new channel instance[m
[32m+[m[32m        const newChannel = new Channel({ name, description, creator_id });[m
[32m+[m
[32m+[m[32m        // Save the channel to the database[m
[32m+[m[32m        await newChannel.save();[m
[32m+[m
[32m+[m[32m        res.status(201).json(newChannel);[m
[32m+[m[32m    } catch (error) {[m
[32m+[m[32m        // Handle duplicate key errors (E11000)[m
[32m+[m[32m        if (error.code === 11000 && error.keyPattern && error.keyValue) {[m
[32m+[m[32m            console.error('Duplicate key error:', error);[m
[32m+[m[32m            return res.status(409).json({ error: 'Channel with this name already exists.' });[m
         }[m
[31m-    };[m
[32m+[m
[32m+[m[32m        // Handle other errors[m
[32m+[m[32m        console.error('Error creating channel:', error);[m
[32m+[m[32m        res.status(500).json({ error: 'Error creating channel' });[m
[32m+[m[32m    }[m
[32m+[m[32m};[m
[1mdiff --git a/server/controllers/messageController.js b/server/controllers/messageController.js[m
[1mindex 89e30d1..32299b4 100644[m
[1m--- a/server/controllers/messageController.js[m
[1m+++ b/server/controllers/messageController.js[m
[36m@@ -1,42 +1,25 @@[m
 // messageController.js[m
 [m
[31m-const Message = require('../models/Message');[m
[32m+[m[32mconst Message = require('../models/Message'); // Import your Message model[m
[32m+[m[32mconst mongoose = require('mongoose');[m
 [m
[31m-// Get messages for a specific channel[m
[31m-exports.getChannelMessages = async (req, res) => {[m
[31m-    const { channelId } = req.params;[m
[31m-[m
[31m-    try {[m
[31m-        if (!channelId) {[m
[31m-            return res.status(400).json({ error: 'Channel ID is required.' });[m
[31m-        }[m
[31m-[m
[31m-        const messages = await Message.find({ channel_id: parseInt(channelId) }).populate('user_id');[m
[31m-        res.status(200).json(messages);[m
[31m-    } catch (error) {[m
[31m-        console.error('Error fetching channel messages:', error);[m
[31m-        res.status(500).json({ error: 'Error fetching channel messages' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-// Send message to channel[m
[32m+[m[32m// Function to create a new message[m
 exports.sendMessage = async (req, res) => {[m
[31m-    const { channelId } = req.params;[m
[31m-    const { content, user_id } = req.body;[m
[32m+[m[32m    const { channel_id, content, user_id } = req.body;[m
 [m
     try {[m
         // Validate request body[m
[31m-        if (!content || !user_id) {[m
[31m-            return res.status(400).json({ error: 'Message content and user ID are required.' });[m
[32m+[m[32m        if (!channel_id || !content || !user_id) {[m
[32m+[m[32m            return res.status(400).json({ error: 'Channel ID, content, and user ID are required.' });[m
         }[m
 [m
         // Create new message object[m
         const newMessage = new Message({[m
[31m-            message_id: generateUniqueMessageId(),[m
[31m-            channel_id: parseInt(channelId),[m
[31m-            user_id: parseInt(user_id),[m
[32m+[m[32m            channel_id,[m
[32m+[m[32m            user_id,[m
             content,[m
[31m-            created_at: new Date() // Ensure created_at is set to the current date/time[m
[32m+[m[32m            // message_id will be auto-generated if using ObjectId type[m
[32m+[m[32m            timestamp: new Date() // Set the timestamp to current date/time[m
         });[m
 [m
         // Save the message to the database[m
[36m@@ -45,18 +28,40 @@[m [mexports.sendMessage = async (req, res) => {[m
         // Respond with the newly created message[m
         res.status(201).json(newMessage);[m
     } catch (error) {[m
[31m-        // Check if the error is a validation error[m
[31m-        if (error.name === 'ValidationError') {[m
[31m-            console.error('Validation Error:', error);[m
[31m-            return res.status(400).json({ error: error.message });[m
[32m+[m[32m        // Handle duplicate key error (E11000)[m
[32m+[m[32m        if (error instanceof mongoose.Error && error.code === 11000) {[m
[32m+[m[32m            console.error('Duplicate key error:', error);[m
[32m+[m[32m            return res.status(409).json({ error: 'Duplicate key error. This message already exists.' });[m
         }[m
 [m
[31m-        console.error('Error sending message:', error);[m
[31m-        res.status(500).json({ error: 'Failed to send message. Please try again later.' });[m
[32m+[m[32m        // Handle other errors[m
[32m+[m[32m        console.error('Error creating message:', error);[m
[32m+[m[32m        res.status(500).json({ error: 'Failed to create message. Please try again later.' });[m
     }[m
 };[m
 [m
[31m-// Function to generate a unique message ID[m
[31m-function generateUniqueMessageId() {[m
[31m-    return Math.floor(Math.random() * 1000000); // Simple example; replace with your actual ID generation logic[m
[31m-}[m
\ No newline at end of file[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m// Get messages for a specific channel[m
[32m+[m[32mexports.getChannelMessages = async (req, res) => {[m
[32m+[m[32m    const { channelId } = req.params;[m
[32m+[m
[32m+[m[32m    try {[m
[32m+[m[32m        // Validate channelId[m
[32m+[m[32m        if (!channelId) {[m
[32m+[m[32m            return res.status(400).json({ error: 'Channel ID is required.' });[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        // Fetch messages from the database where channel_id matches the provided channelId[m
[32m+[m[32m        const messages = await Message.find({ channel_id: parseInt(channelId) }).populate('user_id');[m
[32m+[m
[32m+[m[32m        // Respond with the fetched messages[m
[32m+[m[32m        res.status(200).json(messages);[m
[32m+[m[32m    } catch (error) {[m
[32m+[m[32m        console.error('Error fetching channel messages:', error);[m
[32m+[m[32m        res.status(500).json({ error: 'Error fetching channel messages' });[m
[32m+[m[32m    }[m
[32m+[m[32m};[m
[1mdiff --git a/server/models/Message.js b/server/models/Message.js[m
[1mindex 0e1209f..a2db142 100644[m
[1m--- a/server/models/Message.js[m
[1m+++ b/server/models/Message.js[m
[36m@@ -1,16 +1,51 @@[m
[32m+[m[32m// // models/Message.js[m
[32m+[m
 const mongoose = require('mongoose');[m
 [m
[31m-// Define the schema for the Messages collection[m
 const messageSchema = new mongoose.Schema({[m
[31m-    message_id: { type: Number, required: true, unique: true },[m
[31m-    channel_id: { type: Number, required: true },[m
[31m-    user_id: { type: Number, required: true },[m
[31m-    content: { type: String, required: true },[m
[31m-    created_at: { type: Date, default: Date.now }[m
[32m+[m[32m    message_id: {[m
[32m+[m[32m        type: mongoose.Schema.Types.ObjectId,[m
[32m+[m[32m        default: () => new mongoose.Types.ObjectId(),[m
[32m+[m[32m        required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    channel_id: {[m
[32m+[m[32m        type: Number,[m
[32m+[m[32m        required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    user_id: {[m
[32m+[m[32m        type: Number,[m
[32m+[m[32m        required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    content: {[m
[32m+[m[32m        type: String,[m
[32m+[m[32m        required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    timestamp: {[m
[32m+[m[32m        type: Date,[m
[32m+[m[32m        default: Date.now,[m
[32m+[m[32m        required: true,[m
[32m+[m[32m    }[m
 });[m
 [m
[31m-// Create a model using the schema[m
 const Message = mongoose.model('Message', messageSchema);[m
 [m
[31m-// Export the model to use in other parts of the application[m
 module.exports = Message;[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m// const mongoose = require('mongoose');[m
[32m+[m
[32m+[m[32m// // Define the schema for the Messages collection[m
[32m+[m[32m// const messageSchema = new mongoose.Schema({[m
[32m+[m[32m//     message_id: { type: Number, required: true, unique: true },[m
[32m+[m[32m//     channel_id: { type: Number, required: true },[m
[32m+[m[32m//     user_id: { type: Number, required: true },[m
[32m+[m[32m//     content: { type: String, required: true },[m
[32m+[m[32m//     created_at: { type: Date, default: Date.now }[m
[32m+[m[32m// });[m
[32m+[m
[32m+[m[32m// // Create a model using the schema[m
[32m+[m[32m// const Message = mongoose.model('Message', messageSchema);[m
[32m+[m
[32m+[m[32m// // Export the model to use in other parts of the application[m
[32m+[m[32m// module.exports = Message;[m
[1mdiff --git a/server/models/Schemas.js b/server/models/Schemas.js[m
[1mnew file mode 100644[m
[1mindex 0000000..cae07cb[m
[1m--- /dev/null[m
[1m+++ b/server/models/Schemas.js[m
[36m@@ -0,0 +1,15 @@[m
[32m+[m[32mconst { default: mongoose } = require('mongoose')[m
[32m+[m
[32m+[m[32mconst MongoDB = require('mongoose')[m
[32m+[m[32mconst Schema = mongoose.Schema[m
[32m+[m
[32m+[m[32mconst messagesSchema = new Schema({[m
[32m+[m[32m    id: {type:String, required: true},[m
[32m+[m[32m    sender_id: { type:String, required:true},[m
[32m+[m[32m    receiver_id: {type: String, required:true},[m
[32m+[m[32m    content: { type:String, required: true},[m
[32m+[m[32m    timestamp: { type: Date, default: Date.now }[m
[32m+[m[32m})[m
[32m+[m
[32m+[m
[32m+[m[32mmodule.exports = mongoose.model('messages', messagesSchema);[m
\ No newline at end of file[m
[1mdiff --git a/server/routes/messageRouter.js b/server/routes/messageRouter.js[m
[1mindex 7556adc..b32b82b 100644[m
[1m--- a/server/routes/messageRouter.js[m
[1m+++ b/server/routes/messageRouter.js[m
[36m@@ -8,7 +8,6 @@[m [mconst { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure t[m
 // GET all messages for a channel getChannelMessages[m
 router.get('/channels/:channelId/', authMiddleware, messageController.getChannelMessages);[m
 [m
[31m-// POST a new message to a channel[m
 // POST a new message to a channel[m
 router.post('/channels/:channelId/send', authMiddleware, messageController.sendMessage);[m
 [m
[1mdiff --git a/server/testMessage.js b/server/testMessage.js[m
[1mnew file mode 100644[m
[1mindex 0000000..0a13b33[m
[1m--- /dev/null[m
[1m+++ b/server/testMessage.js[m
[36m@@ -0,0 +1,29 @@[m
[32m+[m[32m// testMessage.js[m
[32m+[m[32mconst mongoose = require('mongoose');[m
[32m+[m[32mconst Message = require('./models/Message'); // Ensure the path is correct[m
[32m+[m[32mconst dotenv = require('dotenv');[m
[32m+[m
[32m+[m[32m// Load environment variables from .env file[m
[32m+[m[32mdotenv.config();[m
[32m+[m
[32m+[m[32m// Connect to MongoDB[m
[32m+[m[32mmongoose.connect(pr