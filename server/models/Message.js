const mongoose = require('mongoose');

// Define the schema for the Messages collection
const messageSchema = new mongoose.Schema({
    message_id: { type: Number, required: true, unique: true },
    channel_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Create a model using the schema
const Message = mongoose.model('Message', messageSchema);

// Export the model to use in other parts of the application
module.exports = Message;
