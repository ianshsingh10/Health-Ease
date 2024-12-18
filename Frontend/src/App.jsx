import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import AmbulanceService from './components/AmbulanceService'; // Import the AmbulanceService component
import ContactUs from './components/ContactUs'; // Import the ContactUs component

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services/ambulance" element={<AmbulanceService />} /> {/* Ambulance Service Route */}
        <Route path="/contact" element={<ContactUs />} /> {/* Contact Us Route */}
      </Routes>
    </div>
  );
}

export default App;
