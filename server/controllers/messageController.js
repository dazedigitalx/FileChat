//messageController.js

const Message = require('../models/Message');



// POST endpoint to send a message to a specific channel
exports.getChannelMessages = async (req, res) => {
    
    try {
        // Validate request body
        if (!content || !user_id) {
            return res.status(400).json({ error: 'Message content and user ID are required.' });
        }

        // Create new message object
        const newMessage = new Message({
            channel_id: channelId,
            content,
            user_id,
            timestamp: new Date() // Assuming you have a timestamp field in your Message model
        });

        // Save the message to the database
        await newMessage.save();

        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
};



// GET all messages for a channel
exports.getChannelMessages = async (req, res) => {
    try {
        const messages = await Message.find({ channel_id: req.params.channelId }).sort('created_at');
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
};


// // POST a new message to a channel
// exports.createMessage = async (req, res) => {
//     const { channelId, content } = req.body;
//     const userId = req.user._id;

//     if (!channelId || !content) {
//         return res.status(400).json({ error: 'Channel ID and content are required' });
//     }

//     try {
//         const newMessage = new Message({
//             channel_id: channelId,
//             user_id: userId,
//             content,
//         });

//         await newMessage.save();
//         res.status(201).json(newMessage);
//     } catch (error) {
//         console.error('Error creating message:', error);
//         res.status(500).json({ error: 'Error creating message' });
//     }
// };
