import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Services from './components/Services';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ProfilePage';
import AboutUs from './components/AboutUs';
import AmbulanceService from './components/AmbulanceService'; // Import the AmbulanceService component
import ContactUs from './components/ContactUs'; // Import the ContactUs component
import AppointmentPage from './components/AppointmentsPage'; // Import the Appointment component
import OnlineConsultation from './components/OnlineConsultation'; // Import the OnlineConsultation component
import BloodDonationPage from './components/BloodDonationPage'; // Import the BloodDonationPage component
import ArticlesPage from './components/ArticlesPage'; // Import the ArticlesPage component
import MedicineOrder from './components/MedicineOrder';
import AddressPage from './components/AddressPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

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
                <Route path="/services/consultation" element={<OnlineConsultation />}/> {/* Online Consultation Route */}
                <Route path="/services/blood-bank" element={<BloodDonationPage />} /> {/* Blood Donation route */}
                <Route path="/articles" element={<ArticlesPage />} /> {/* Articles Page route */}
                <Route path="/contact" element={<ContactUs />} /> {/* Contact Us Route */}        
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/MedicineOrder" element={<MedicineOrder />} />
                <Route path="/address" element={<AddressPage />} />
            </Routes>
        </div>
    );
}
export default App;
