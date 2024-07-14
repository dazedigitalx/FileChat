const mongoose = require('mongoose');

const ChannelGuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    anonymousId: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChannelGuest', ChannelGuestSchema);
