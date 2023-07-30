import React from "react";

import "./styles.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
      <div className="not-found-image">
        <img
          src="https://i.imgur.com/qIufhof.png" // Replace with your preferred 404 image
          alt="404 Not Found"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
