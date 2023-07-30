import React from "react";

import "./styles.css";

// Import the CSS file for styling (see below)

const NotAuthorized: React.FC = () => {
  return (
    <div className="not-authorized-container">
      <div className="not-authorized-image">
        <img
          src="https://img.freepik.com/free-vector/403-error-forbidden-with-police-concept-illustration_114360-1884.jpg?w=826&t=st=1690682001~exp=1690682601~hmac=4363f21e8246d9ee71d0807a09c2f9eb306345a14becc7768996bd6ae8fabf4a" // Replace with your preferred illustration
          alt="Not Authorized"
        />
      </div>
      <div className="not-authorized-content">
        <h1>Not Authorized</h1>
        <p>Sorry, you are not authorized to access this page.</p>
      </div>
    </div>
  );
};

export default NotAuthorized;
