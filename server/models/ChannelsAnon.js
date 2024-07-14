const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  anonymousId: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Use the collection name 'channelsAnon' explicitly
module.exports = mongoose.model('ChannelsAnon', channelSchema, 'channelsAnon');
