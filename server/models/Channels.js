// // models/Channels.js


const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator_id: { type: String, required: true }, // Assuming creator_id is a string, adjust if necessary
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;




// const mongoose = require('mongoose');

// // Define the schema for the Channels collection
// const channelSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     creator_id: {
//         type: String,
//         required: true
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Create a model using the schema
// const Channel = mongoose.model('Channel', channelSchema);

// // Export the model to use in other parts of the application
// module.exports = Channel;
