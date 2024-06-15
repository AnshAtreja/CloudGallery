import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-butter h-screen flex justify-center items-center">
      <div className="w-1/2 p-8">
        <h1 className="text-7xl mb-4">Welcome to CloudGallery</h1>
        <p className="mb-8">Upload your images on the go without ever worrying about running out of storage. Upload your images securely on <strong>CloudGallery</strong>. Seamlessly integrated with modern features, such as user authentication and dynamic image browsing, CloudGallery offers a user-friendly interface for users to interact with their images anytime, anywhere. Whether you're a photography enthusiast, a professional, or simply looking to organize your personal images, CloudGallery provides the tools you need to curate and showcase your visual content with ease. Experience the convenience and flexibility of CloudGallery for all your image management needs.</p>
        <Link
          to={localStorage.getItem('token') ? '/upload' : '/login'}
          className="bg-gold hover:bg-darkgold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {localStorage.getItem('token') ? 'Upload Images' : 'Login to Upload'}
        </Link>
      </div>

      <div className="w-1/2 p-8">
        <img src="/img_person.png" alt="Uploaded Image" className="ml-12"/>
        <div className="w-full h-full bg-gray-200"></div>
      </div>
    </div>
  );
}

export default HomePage;
