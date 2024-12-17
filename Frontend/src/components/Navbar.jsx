import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';  // Import NavLink for active link styling
import { FaStethoscope, FaAmbulance, FaBed, FaHeartbeat, FaDollarSign, FaTint } from 'react-icons/fa';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 w-[100vw] z-[5]">
      <div className="h-[3vmin] bg-white"></div>
      <div className="h-[8vh] bg-[#F3F3F3] flex items-center justify-between p-[2vmin] pl-[5vmin] pr-[5vmin]">
        <div className="flex items-center gap-[1vmin]">
          <img
            src="/logo.png"
            alt="Health Ease Logo"
            className="w-12 h-12 mr-2"
          />
          <div
            className="w-[5vmin] h-[5vmin] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('Frontend/public/logo-removebg-preview.png')",
            }}
          ></div>
          <a href="#" className="flex items-center gap-[1vmin]">
            <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              HeathEase
            </div>
          </a>
        </div>
        <div className="flex gap-[3vmin] text-[2vmin] relative">
          {/* Use NavLink for active link styling */}
          <NavLink
            to="/"
            exact
            activeClassName="text-blue-600"  // Add active class for Home
            className="hover:text-blue-500"
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="text-blue-600"  // Active color for About
            className="hover:text-blue-500"
          >
            ABOUT
          </NavLink>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="focus:outline-none"
            >
              SERVICES
            </button>
            {showDropdown && (
              <div className="absolute top-[100%] left-0 bg-white shadow-lg rounded-md mt-2 w-[25vmin] text-left">
                <ul className="text-[1.8vmin]">
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaStethoscope />
                    <a href="#">Online Consultation</a>
                  </li>
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaAmbulance />
                    <a href="#">Ambulance Services</a>
                  </li>
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaBed />
                    <a href="#">Bed Availability</a>
                  </li>
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaHeartbeat />
                    <a href="#">Body Checkup</a>
                  </li>
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaDollarSign />
                    <a href="#">Healthcare Cost Estimation</a>
                  </li>
                  <li className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]">
                    <FaTint />
                    <a href="#">Blood Bank</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <NavLink
            to="/articles"
            activeClassName="text-blue-600"  // Active color for Articles
            className="hover:text-blue-500"
          >
            ARTICLES
          </NavLink>
          <NavLink
            to="/medicines"
            activeClassName="text-blue-600"  // Active color for Medicines
            className="hover:text-blue-500"
          >
            MEDICINES
          </NavLink>
          <NavLink
            to="/contact"
            activeClassName="text-blue-600"  // Active color for Contact
            className="hover:text-blue-500"
          >
            CONTACT US
          </NavLink>
        </div>
        
        <div className="flex gap-[1vmin]">
            <a href="">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">Language</div>
            </a>
            <a href="">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">Join Us</div>
            </a>

          <Link to="/login">
            <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              Login
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
