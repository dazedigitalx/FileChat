import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Home.css';
import './Style.css';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state
  const [error, setError] = useState(null); // State for potential errors
  const [imageUrl, setImageUrl] = useState(null); // State for image URL

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getImageUrl();
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
    <div className="home-container" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {isLoading && <div className="loading-indicator">Loading...</div>} {/* Optional loading indicator */}
      {error && <div className="error-message">{error}</div>} {/* Optional error message */}
      <div className="content">
        <h1>Welcome to Our App</h1>
        <p>Discover amazing features and join our community!</p>
        <div className="button-container">
          <Link to="/login" className="submit">
            <button type="submit">Login</button>
          </Link>
          <span></span>
          <br />
          <Link to="/signup" className="submit">
            <button type="submit">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
