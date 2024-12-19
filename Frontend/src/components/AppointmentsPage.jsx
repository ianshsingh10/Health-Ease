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
  const [searchTerm, setSearchTerm] = useState(''); // Single state for combined search

  useEffect(() => {
    // Fetch doctor details when component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
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
    // Filter doctors based on the combined search term
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]); // Re-run the filter when searchTerm or doctors change

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
      doctorName: formData.doctor.name, // Ensure doctor name is included
      specialty: formData.doctor.specialty, // Include specialty
      location: formData.doctor.location, // Include location
      fees: formData.doctor.fees, // Include doctor's fees
      date: formData.date,
      time: formData.time,
    };

    try {
      const response = await axios.post('http://localhost:5000/appointments', appointmentData);
      alert('Appointment booked successfully');
      setIsBooking(false); // Close modal after successful booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="p-6 mt-[10vmin]">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Doctor</h1>

      {/* Combined Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          placeholder="Search by Doctor Name or Location"
          className="w-full p-2 border rounded-md"
        />
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
          <p>No doctors found for the selected criteria</p>
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

export default AppointmentPage;
