import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Style.css'; // Import the CSS file
import './Signup.css'; // Import the CSS file


const Signup = () => {
  return (
    <div className="signup-page">
      {/* Full-width background with optional gradient */}
      <div className="background-gradient"></div>

      <div className="signup-form-container">
        {/* Centered signup card with white background and rounded corners */}
        <div className="signup-box">
          <h2>Welcome</h2>

          <div className="button-container">
            <Link to="/login" className="button">
            <button type="submit">Login</button>
<span><br></br></span><span></span>
<span><br></br></span><span></span>

            </Link>
            <span className="spacer"></span>  {/* Add a spacer for better separation */}
            <Link to="/signup" className="button">
            <button type="submit">Sign Up</button>

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
