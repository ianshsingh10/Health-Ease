import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Services from './components/Services';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ProfilePage';

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
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
            </Routes>
        </div>
    );
}

export default App;
