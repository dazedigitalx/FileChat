// Middleware to verify anonymous ID
const verifyAnonymous = async (req, res, next) => {
    const { anonymousId } = req.query; // Get anonymousId from query parameters

    if (!anonymousId) {
        return res.status(400).json({ error: 'Anonymous ID is required' });
    }

    // Verify if the anonymousId exists in your database
    const isValidAnonymous = await Channel.exists({ 'anonymousId': anonymousId });

    if (!isValidAnonymous) {
        return res.status(401).json({ error: 'Invalid Anonymous ID' });
    }

    next();
};

module.exports = verifyAnonymous;
