// Message.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    channel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
