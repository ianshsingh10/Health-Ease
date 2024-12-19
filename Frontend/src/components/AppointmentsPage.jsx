import React from 'react';
import imagePath from '../images/ai-healthcare-desktop.webp'; // Adjusted relative path

function OnlineConsultation() {
  return (
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
    </div>
  );
}

export default OnlineConsultation;
