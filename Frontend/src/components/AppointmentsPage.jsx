import React, { useState } from "react";
import axios from "axios";

function AppointmentsPage() {
  const [formData, setFormData] = useState({
    patientName: "", // Added patientName field
    email: "",
    phone: "",
    date: "",
    time: "",
    searchQuery: "",
    doctor: null, // To store the selected doctor
  });

  const [isBooking, setIsBooking] = useState(false); // To manage booking form visibility

  const doctors = [
    { name: "Dr. Aryan Gupta", specialty: "Cardiologist", location: "Mumbai", charges: "₹1,200", image: "/images/doctor1.jpg" },
    { name: "Dr. Meera Sharma", specialty: "Dermatologist", location: "Bangalore", charges: "₹800", image: "/images/doctor2.jpg" },
    { name: "Dr. Kavita Roy", specialty: "Pediatrician", location: "Delhi", charges: "₹1,000", image: "/images/doctor3.jpg" },
    { name: "Dr. Rohan Desai", specialty: "Neurologist", location: "Pune", charges: "₹1,500", image: "/images/doctor4.jpg" },
    // Add more doctors...
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(formData.searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookClick = (doctor) => {
    setFormData({ ...formData, doctor });
    setIsBooking(true); // Show booking form after selecting a doctor
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/appointments", {
        patientName: formData.patientName, // Send patient name to the backend
        doctor: {
          name: formData.doctor.name,
          specialty: formData.doctor.specialty,
          location: formData.doctor.location,
          charges: formData.doctor.charges,
        },
        date: formData.date,
        time: formData.time,
        email: formData.email,
        phone: formData.phone,
      });

      if (response.status === 200) {
        alert("Appointment booked successfully!");
        setIsBooking(false); // Close the booking form
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-white min-h-screen mt-[10vmin]">
      <div className="w-full max-w-lg text-left space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Book your <span className="text-blue-500">virtual</span> appointment
        </h1>
        <p className="text-gray-600">
          Get in touch with our expert team and book an appointment online.
        </p>

        <div className="relative flex items-center">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search Doctors by name or location"
            value={formData.searchQuery}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button className="absolute right-2 bg-blue-500 text-white p-2 rounded-lg">
            🔍
          </button>
        </div>
      </div>

      <div className="w-full mt-8 flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold mb-6">Available Doctors</h2>
        <ul className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-gray-500">
                  {doctor.location} | <span className="font-bold">{doctor.charges}</span>
                </p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleBookClick(doctor)}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Form Modal */}
      {isBooking && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">Book Appointment with {formData.doctor.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="patientName"
                placeholder="Your Name"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
              >
                Confirm Booking
              </button>
            </form>
            <button
              onClick={() => setIsBooking(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
