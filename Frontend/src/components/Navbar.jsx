import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ isLoggedIn, username, setIsLoggedIn, setUsername }) {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        setIsLoggedIn(false); // Update the login state
        setUsername(''); // Clear the username
    };

    return (
        <nav className="fixed top-0 w-full z-50 shadow-md">
            <div className="h-[3vmin] bg-white"></div>
            <div className="h-[8vh] bg-[#F3F3F3] flex items-center justify-between px-6 md:px-16">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                    <Link to="/">
                        <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                            HealthEase
                        </div>
                    </Link>
                </div>

                <div className="hidden md:flex gap-6 text-[2vmin]">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/services">Services</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <Link to={`/profile/${username}`} className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">{username}</Link>
                            <Link to="/">
                                <button className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]" onClick={handleLogout}>Logout</button>
                            </Link>
                            
                        </div>
                    ) : (
                        <Link to="/login">
                            <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                                Login
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
