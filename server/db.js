const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
