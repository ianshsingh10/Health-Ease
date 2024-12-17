import React, { useState } from "react";

function AppointmentsPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    date: "",
    searchQuery: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked successfully!\n${JSON.stringify(formData)}`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-white min-h-screen">
      {/* Left Content */}
      <div className="lg:w-1/2 text-left space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Book your <span className="text-blue-500">virtual</span> appointment
        </h1>
        <p className="text-gray-600">
          Being in the healthcare sector, we ensure the safety of our patients
          and provide timely medical care. Get in touch with our expert team.
        </p>

        {/* Search Box */}
        <div className="relative flex items-center">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search Doctors in your location"
            value={formData.searchQuery}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button className="absolute right-2 bg-blue-500 text-white p-2 rounded-lg">
            🔍
          </button>
        </div>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">
            Easily book an appointment
          </h3>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <img
          src="/doctor.png" /* Place this image in 'public' or 'assets' folder */
          alt="Doctor"
          className="w-full max-w-sm object-cover"
        />
      </div>
    </div>
  );
}

export default AppointmentPage;
