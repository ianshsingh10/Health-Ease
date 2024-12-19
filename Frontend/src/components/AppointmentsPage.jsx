<<<<<<< HEAD
import React from 'react';
import imagePath from '../images/ai-healthcare-desktop.webp'; // Adjusted relative path
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    doctor: null,
    patientName: '',
    date: '',
    time: '',
    email: '',
    phone: '',
  });
  const [searchLocation, setSearchLocation] = useState(''); // State for search filter

  useEffect(() => {
    // Fetch doctor details when component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        console.log(response.data); // Check doctor data
        setDoctors(response.data); // Set doctors in state
        setFilteredDoctors(response.data); // Initialize filtered doctors with all doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
        alert('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Filter doctors based on location search term
    const filtered = doctors.filter((doctor) =>
      doctor.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchLocation, doctors]); // Re-run the filter when searchLocation or doctors change

  const handleBookClick = (doctor) => {
    setFormData({ ...formData, doctor }); // Store doctor in formData for booking
    setIsBooking(true); // Open the booking modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctor) {
      alert('Please select a doctor.');
      return;
    }

    const appointmentData = {
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      doctorName: formData.doctor.name,  // Ensure doctor name is included
      specialty: formData.doctor.specialty, // Include specialty
      location: formData.doctor.location, // Include location
      fees: formData.doctor.fees, // Include doctor's fees
      date: formData.date,
      time: formData.time
    };

    try {
      const response = await axios.post('http://localhost:5000/appointments', appointmentData);
      console.log(response.data);
      alert('Appointment booked successfully');
      setIsBooking(false); // Close modal after successful booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };
>>>>>>> 1482574dc3672847281dff29b6fad6064dc5ba42

function OnlineConsultation() {
  return (
<<<<<<< HEAD
    <div
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Fixes the background during scrolling
        height: '100vh', // Ensures the container takes full viewport height
      }}
      className="flex flex-col items-center justify-center text-center p-8"
    >
      <h1 className="text-4xl font-bold text-[#0095DE]">Book Your Virtual Appointment</h1>
      <p className="mt-4 text-lg text-gray-600">
        Being in the healthcare sector, we consider it our paradigm duty to ensure the safety of our
        patients, transparency in our practices, and absolute timely care.
      </p>
      <h2 className="mt-8 text-3xl font-semibold text-[#333333]">
        Get Expert <span className="text-[#0095DE]">Medical Consultation!</span>
      </h2>
      <p className="mt-4 text-gray-600">
        Our doctors provide expert medical advice and consultation. Get in touch with our team to
        discuss.
      </p>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search Doctors in your location"
          className="border rounded-md p-2 w-[300px] focus:outline-none"
=======
    <div className="p-6 mt-[10vmin]">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Doctor</h1>
      
      {/* Search Bar for Location */}
      <div className="mb-6">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)} // Update search term
          placeholder="Search by Location"
          className="w-full p-2 border rounded-md"
>>>>>>> 1482574dc3672847281dff29b6fad6064dc5ba42
        />
        <button className="ml-2 bg-[#0095DE] text-white px-4 py-2 rounded-md">
          Search
        </button>
      </div>
      <div className="mt-12 bg-white p-4 rounded-md shadow-md w-[80%] max-w-[600px]">
        <p className="font-semibold">Easily book an appointment in 3 simple steps:</p>
        <ol className="mt-4 list-decimal list-inside text-left">
          <li>Enter your details</li>
          <li>Select a time slot</li>
          <li>Confirm your appointment</li>
        </ol>
        <button className="mt-4 bg-[#0095DE] text-white px-6 py-2 rounded-md hover:bg-[#007bbd]">
          Book Now
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-500 mt-2">Location: {doctor.location}</p> {/* Display doctor's location */}
              <button
                onClick={() => handleBookClick(doctor)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>No doctors found for the selected location</p>
        )}
      </div>

      {isBooking && formData.doctor && ( // Ensure doctor is selected before showing the modal
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Book Appointment with {formData.doctor.name}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <input
                type="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <div className="flex space-x-4 mb-4">
                <input
                  type="date"
                  placeholder="Appointment Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="time"
                  placeholder="Appointment Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnlineConsultation;
