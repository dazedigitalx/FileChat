// models/Message.js

const mongoose = require('mongoose');
const { applyDefaults } = require('./Channel');


// Define the schema for the Messages collection
const messageSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    // message_id: { type: Number, required: true, unique: true },
    channel_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true }

    id: { type: ObjectId, required: true },
    channel_id: { type: String, required: true },
    user_id: { type: ObjectId, required: true },
    creator_id: { type: ObjectId, required: true },
    created_at: { type: Date, applyDefaults: Date.now }
});

// Create a model using the schema
const Message = mongoose.model('Message', messageSchema);

// Export the model to use in other parts of the application
module.exports = Message;