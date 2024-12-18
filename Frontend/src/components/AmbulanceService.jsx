import React from "react";
import ambulanceImage from "../images/ambulance.png.jpg"; // Background image
import ambulanceMain from "../images/ambulance-main.png.png"; // Ambulance image for left box

function AmbulanceService() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${ambulanceImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Page Heading */}
        <div className="text-center pt-[12vmin] mb-[4vmin]">
          <h1 className="text-5xl font-bold text-[#0095DE]">Ambulance Service</h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-center items-start gap-[5vmin] m-[5vmin]">
          {/* Left Content - Emergency Response */}
          <div className="w-[50%] rounded-2xl border-2 border-[#0095DE] p-[2vmin] shadow-lg bg-white">
            {/* Heading */}
            <div className="text-center mb-[2vmin]">
              <p className="font-bold text-3xl text-[#0095DE]">Reliable and Fast</p>
              <p className="font-bold text-3xl text-[#0095DE]">
                Ambulance Services, Anytime.
              </p>
            </div>

            {/* Content */}
            <div className="flex items-center gap-[2vmin]">
              {/* Image */}
              <div className="w-[750px] h-[170px]">
                <img
                  src={ambulanceMain}
                  alt="Ambulance Service"
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              {/* Description */}
              <p className="text-justify">
                At <b>Health Ease</b>, we provide 24/7 ambulance services ensuring
                rapid response during critical moments. Our skilled paramedics and
                well-equipped vehicles are ready to bring you life-saving assistance
                whenever required. Your safety is our top priority.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-[2vmin]">
              <a href="#">
                <div className="w-full p-[1vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
                  Request an Ambulance Now
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmbulanceService;
