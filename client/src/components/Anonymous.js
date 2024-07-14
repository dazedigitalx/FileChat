import React, { useState } from 'react';
import axios from 'axios';
import { generateAnonymousId } from '../utils'; // Import the utility function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const Anonymous = () => {
    const [anonymousId, setAnonymousId] = useState(generateAnonymousId()); // Generate and set the anonymous ID on component mount
    const [message, setMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState(''); // State to store detailed error info
    const navigate = useNavigate(); // Initialize the navigate function

    const handleVerify = async () => {
        try {
            const response = await axios.get(`/api/verify-anonymous`, { params: { anonymousId } });
            setMessage(response.data.message);  // Set the message from the response
            // Check if the ID is valid and navigate to the dashboard
            if (response.status === 200) {
                navigate('/anonymous-dashboard'); // Redirect to the Anonymous Dashboard on successful verification
            }
        } catch (error) {
            // Handle network or client-side errors
            if (!error.response) {
                setMessage('Network error: Unable to reach the server. Please check your internet connection.');
                setErrorDetails(`Network Error: ${error.message}`);
                console.error('Network Error:', error);
                return;
            }

            // Handle server-side errors
            switch (error.response.status) {
                case 400:
                    // Bad Request
                    if (error.response.data.error === 'Invalid Anonymous ID') {
                        setMessage('The provided anonymous ID is invalid. Please check and try again.');
                    } else {
                        setMessage('Bad Request: Please check your input and try again.');
                    }
                    break;
                case 404:
                    // Not Found
                    setMessage('The requested resource could not be found. Please check the URL and try again.');
                    break;
                case 500:
                    // Internal Server Error
                    setMessage('Server error: There was an issue with the server. Please try again later.');
                    break;
                default:
                    // Other errors
                    setMessage(error.response.data.error || 'An unknown error occurred.');
                    break;
            }

            setErrorDetails(`Status Code: ${error.response.status}, Error Message: ${error.response.data.error}`);
            console.error('Error response:', error.response);
        }
    };

    return (
        <div>
            <h2>Anonymous Verification</h2>
            <p><strong>Generated Anonymous ID:</strong> {anonymousId}</p>
            <button onClick={handleVerify}>Verify ID</button>
            <p>{message}</p>
            {errorDetails && <pre style={{ color: 'red' }}>{errorDetails}</pre>} {/* Display detailed error info */}
        </div>
    );
};

export default Anonymous;
