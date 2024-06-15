import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ImageUploadPage from './pages/ImageUploadPage';
import UploadsPage from './pages/UploadsPage';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/signup" element={<SignupPage/>} />
        <Route exact path="/upload" element={<ImageUploadPage/>} />
        <Route exact path="/uploads" element={<UploadsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
