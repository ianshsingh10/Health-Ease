import React from 'react';
import { useNavigate } from 'react-router-dom';

const checkups = [
  { id: 1, name: 'General Health Checkup', description: 'A complete health checkup covering major health parameters.', cost: '₹7,499', image: 'data:image/jpeg;base64,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' },
  { id: 2, name: 'Cardiac Checkup', description: 'A detailed heart health checkup including ECG, stress test, etc.', cost: '₹3,999', image: 'https://www.sunderclinic.com/assets/img/health-check/executive-cardiac-health-checkup.jpg' },
  { id: 3, name: 'Diabetes Checkup', description: 'A comprehensive test to check blood sugar levels and related risks.', cost: '₹6,499', image: 'https://lotusdiagnostic.com/wp-content/uploads/2023/03/Diabetes-Blood-Tests-1280x720-1.jpg' },
  { id: 4, name: 'Kidney Checkup', description: 'Tests related to kidney function and overall health.', cost: '₹7,999', image: 'https://www.healthcareontime.com/newimages/kidney-function-test.png' },
  { id: 5, name: 'Full Body Checkup', description: 'An extensive checkup for all major organs and functions.', cost: '₹7,500', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTMYEe9QVsAJTVeYEeP-WIgkI40aozwoyig&s' },
  { id: 6, name: 'Thyroid Checkup', description: 'Tests for thyroid function and related issues.', cost: '₹5,499', image: 'https://health-e.in/wp-content/uploads/2024/02/hypothyroidism-result-with-blood-sample-tube.webp' },
  { id: 7, name: 'Liver Checkup', description: 'Tests to assess liver health and functionality.', cost: '₹7,499', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurWKoXGS6Ft3g4KnnJLdSpxUdbB3mO6MzhQ&s' },
  { id: 8, name: 'Respiratory Checkup', description: 'Checkup for respiratory health including lung function tests.', cost: '₹6,999', image: 'https://www.lung.org/getmedia/ef87cb9c-aeec-4dd6-a0f6-0057e4709d8b/pulmonary-function-test_i.jpg?width=700&height=350&ext=.jpg' },
  { id: 9, name: 'Cancer Screening', description: 'Screening tests for early detection of cancer in different organs.', cost: '₹14,999', image: 'https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/500/7/files/cancer-screening-test-article.jpg?h=cb2c0a05&itok=uCqnvBQj' },
  { id: 10, name: 'Pregnancy Checkup', description: 'Complete checkup for expecting mothers to monitor pregnancy progress.', cost: '₹8,999', image: 'https://cdn.prod.website-files.com/5ee7039040ea6efb80d7521c/67221b571db4d44392a22f23_672214d19dca743317f550ca_freepik-export-202410301110139XdE.jpeg' },
  { id: 11, name: 'Bone Health Checkup', description: 'Tests to assess bone density and overall bone health.', cost: '₹6,199', image: 'https://www.medicoverhospitals.in/images/preventive/bone-checkup-medicover-hospitals.webp' },
  { id: 12, name: 'Eye Checkup', description: 'Comprehensive eye checkup to test vision and detect common eye diseases.', cost: '₹5,199', image: 'https://eye7.b-cdn.net/wp-content/uploads/optometrist-checking-male-patient-vision-with-trial-frame.jpg' },
];

function CheckupList() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleBookClick = (checkupId) => {
    // Navigate to the booking details page with the checkupId as a URL parameter
    navigate(`/book/${checkupId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-[12vh]">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#0095DE]">Available Checkups</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checkups.map((checkup) => (
            <div key={checkup.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              <img 
                src={checkup.image} 
                alt={checkup.name} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h3 className="text-2xl font-semibold text-[#333]">{checkup.name}</h3>
              <p className="text-gray-600 mb-4">{checkup.description}</p>
              <p className="text-lg font-semibold text-[#0095DE] mb-4">Cost: {checkup.cost}</p>
              <button
                onClick={() => handleBookClick(checkup.id)}
                className="px-6 py-2 bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] text-white rounded-md text-lg w-full"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckupList;