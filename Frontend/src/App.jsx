import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Services from './components/Services';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ProfilePage';
import AboutUs from './components/AboutUs';
<<<<<<< HEAD
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
=======
import AmbulanceService from './components/AmbulanceService'; // Import the AmbulanceService component
import ContactUs from './components/ContactUs'; // Import the ContactUs component
import AppointmentPage from './components/AppointmentsPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
>>>>>>> 1482574dc3672847281dff29b6fad6064dc5ba42

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const user = JSON.parse(atob(token.split('.')[1]));
            setUsername(user.username);
        }
    }, []);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointment" element={<AppointmentPage/>}/>
                <Route path="/services" element={<Services />} />
                <Route path="/services/ambulance" element={<AmbulanceService />} /> {/* Ambulance Service Route */}
                <Route path="/contact" element={<ContactUs />} /> {/* Contact Us Route */}
                <Route path="/profile/:username" element={<ProfilePage />} />
            </Routes>
        </div>
    );
}
export default App;
