import React from 'react';

const Image = ({ imageUrl, alt }) => {
  return (
    <img
      src={`http://localhost:5000/${imageUrl}`}
      alt={alt}
      className="mb-10 mr-10" // Add margin between images (bottom and right)
      style={{
        width: '200px', // Fixed width
        height: '200px', // Fixed height
        objectFit: 'cover', // Crop the image to fill the container
        objectPosition: 'center', // Center the cropped image
        borderRadius: '5px', // Optional: Add rounded corners
      }}
    />
  );
};

export default Image;
