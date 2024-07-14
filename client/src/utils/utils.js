// Function to generate a unique ID
const generateAnonymousId = () => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    return `anon-${timestamp}-${randomNum}`; // Concatenate timestamp and random number
};

// Default export
export default generateAnonymousId;
