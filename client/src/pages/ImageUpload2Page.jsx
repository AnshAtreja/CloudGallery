import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const UploadImagesPage = () => {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [uploadSuccess]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
      setUploadError("");
    } else {
      setImage(null);
      setUploadError("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setUploadError("Please select an image file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setUploadError(data.message);
        setUploadSuccess(false);
        return;
      }

      setUploadError("");
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      setUploadError("An error occurred. Please try again later.");
      setUploadSuccess(false);
    }
  };

  return (
    <div className="bg-butter flex flex-col items-center justify-center py-8 h-screen">
      <form onSubmit={handleSubmit} className="w-96 mb-8">
        <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
        {uploadSuccess && (
          <p className="text-green-500 mb-4">File uploaded successfully!</p>
        )}
        {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm bg-gold hover:bg-darkgold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload
        </button>
      </form>
      <Link to="/uploads"
        className="bg-gold hover:bg-darkgold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View Uploaded Images
      </Link>
    </div>
  );
};

export default UploadImagesPage;
