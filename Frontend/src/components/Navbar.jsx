import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink for active link styling
import { FaStethoscope, FaAmbulance, FaBed, FaHeartbeat, FaDollarSign, FaTint } from 'react-icons/fa';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-10">
      {/* Top Spacer */}
      <div className="h-[3vmin] bg-white"></div>

      {/* Navbar with background image */}
      <div
        className="h-[8vh] bg-cover bg-center flex items-center justify-between p-[2vmin] pl-[5vmin] pr-[5vmin]"
        style={{
          backgroundImage: 'url("/images/your-background-image.jpg")', // Reference image from the public folder
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-[1vmin]">
          <img src="/logo.png" alt="Health Ease Logo" className="w-12 h-12 mr-2" />
          <div
            className="w-[5vmin] h-[5vmin] bg-cover bg-center"
            style={{
              backgroundImage: "url('/logo-removebg-preview.png')",
            }}
          ></div>
          <Link to="/" className="flex items-center gap-[1vmin]">
            <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              HealthEase
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-[3vmin] text-[2vmin] relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'hover:text-blue-500'
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'hover:text-blue-500'
            }
          >
            ABOUT
          </NavLink>

          {/* Services Dropdown */}
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
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaStethoscope />
                    <Link to="/services/online-consultation">Online Consultation</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaAmbulance />
                    <Link to="/services/ambulance">Ambulance Services</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaBed />
                    <Link to="/services/beds">Bed Availability</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaHeartbeat />
                    <Link to="/services/checkup">Body Checkup</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaDollarSign />
                    <Link to="/services/cost-estimation">Healthcare Cost Estimation</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaTint />
                    <Link to="/services/blood-bank">Blood Bank</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Articles Page Link */}
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'hover:text-blue-500'
            }
          >
            ARTICLES
          </NavLink>

          {/* Medicines Page Placeholder */}
          <NavLink
            to="/medicines"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'hover:text-blue-500'
            }
          >
            MEDICINES
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'hover:text-blue-500'
            }
          >
            CONTACT US
          </NavLink>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-[1vmin]">
          <button className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
            Language
          </button>
          <button className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
            Join Us
          </button>
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
