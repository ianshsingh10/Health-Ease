import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import AmbulanceService from './components/AmbulanceService';
import OnlineConsultation from './components/OnlineConsultation';
import ContactUs from './components/ContactUs';
import BloodDonationPage from './components/BloodDonationPage'; // Import the BloodDonationPage component
import ArticlesPage from './components/ArticlesPage'; // Import the ArticlesPage component

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services/ambulance" element={<AmbulanceService />} />
        <Route
          path="/services/online-consultation"
          element={
            <OnlineConsultation imagePath={'/src/images/Screenshot 2024-12-19 120005.png'} />
          }
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/blood-bank" element={<BloodDonationPage />} /> {/* Blood Donation route */}
        <Route path="/articles" element={<ArticlesPage />} /> {/* Articles Page route */}
      </Routes>
    </div>
  );
}

export default App;
