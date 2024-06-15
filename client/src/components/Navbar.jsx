import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const authToken = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  };

  return (
    <nav className="bg-gold p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold"><img src="/cloud_logo.png" alt="Uploaded Image" className="ml-12" style={{ width: '70px', height: '35px' }} /></Link> 
      <div className="flex items-center">
        {authToken ? (
          // If authentication token exists, render Logout option
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        ) : (
        <>
            <Link to="/signup" className="btn btn-primary mr-4">Sign Up</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </>

        )}
      </div>
    </nav>
  );
};

export default Navbar;
