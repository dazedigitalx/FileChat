const mongoose = require('mongoose');

const channelGuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness if needed
    },
    description: {
        type: String,
        required: true,
    },
    anonymousId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('ChannelGuest', channelGuestSchema);
