import React, { useState, useEffect } from 'react';
import { getRandomImageURL } from './Script/imageLoader'; // Import the function
import { Link } from 'react-router-dom'; // Import Link
import './Home.css';

const Home = () => {
  const [imageUrl, setImageUrl] = useState(null); // Initial state for image URL
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state
  const [error, setError] = useState(null); // State for potential errors

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getRandomImageURL();
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('Failed to load image. Please try again later.'); // User-friendly error message
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or failure)
      }
    };

    fetchImage();
  }, []); // Empty dependency array to fetch only on component mount

  return (
    <div className="home-container">
      {isLoading && <div className="loading-indicator">Loading...</div>} {/* Optional loading indicator */}
      {error && <div className="error-message">{error}</div>} {/* Optional error message */}
      <div
        className="home-container"
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
      />
      <div className="content">
        <h1>Welcome to Our App</h1>
        <p>Discover amazing features and join our community!</p>
        <div className="button-container">
          <Link to="/login" className="button">
            Login
          </Link>
          <Link to="/signup" className="button">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
