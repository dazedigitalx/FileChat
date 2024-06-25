//messageController.js

const Message = require('../models/Message');


// GET all messages for a specific channel
exports.getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;

        // Fetch messages for the specified channel
        const messages = await Message.find({ channel_id: channelId }).populate('user_id');


        
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving channel messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages. Please try again later.' });
    }
};

exports.sendMessage = async (req, res) => {
    const { channelId } = req.params;
    const { content, user_id } = req.body; // Ensure correct key name for user_id

    try {
        // Validate request body
        if (!content || !user_id) {
            return res.status(400).json({ error: 'Message content and user ID are required.' });
        }

        // Create new message object
        const newMessage = new Message({
            id: generateUniqueMessageId(), // Function to generate a unique ID for message
            channel_id: parseInt(channelId), // Ensure channelId is parsed to Number if needed
            user_id: parseInt(user_id), // Ensure user_id is parsed to Number
            content,
            created_at: new Date() // Set created_at to current date/time
        });

        // Save the message to the database
        await newMessage.save();

        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error);
            return res.status(400).json({ error: error.message });
        }

        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
};

// Function to generate a unique ID for the message
function generateUniqueMessageId() {
    // Logic to generate a unique ID, could be based on a counter or UUID
    // Example: return Math.floor(Math.random() * 1000);
    return Math.floor(Math.random() * 1000); // Replace with your actual ID generation logic
}