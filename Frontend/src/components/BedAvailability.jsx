import React, { useState } from 'react';
import bedImage from '../images/1140-hospital-room (1).webp'; // Updated image path

function BedAvailability() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedBedType, setSelectedBedType] = useState('');
    const [filteredHospitals, setFilteredHospitals] = useState([]);

    const locations = ['Location 1', 'Location 2', 'Location 3'];
    const bedTypes = ['General Ward', 'Private Room', 'ICU'];

    const hospitalData = [
        { name: 'Hospital A', location: 'Location 1', beds: ['General Ward', 'Private Room'] },
        { name: 'Hospital B', location: 'Location 1', beds: ['ICU', 'Private Room'] },
        { name: 'Hospital C', location: 'Location 2', beds: ['General Ward', 'ICU'] },
        { name: 'Hospital D', location: 'Location 3', beds: ['General Ward', 'Private Room'] },
        { name: 'Hospital E', location: 'Location 3', beds: ['ICU'] },
    ];

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        setSelectedBedType(''); // Reset bed type when location changes
        setFilteredHospitals([]); // Clear filtered hospitals when location changes
    };

    const handleBedTypeChange = (e) => {
        const bedType = e.target.value;
        setSelectedBedType(bedType);

        // Filter hospitals based on selected location and bed type
        const results = hospitalData.filter(
            (hospital) =>
                hospital.location === selectedLocation && hospital.beds.includes(bedType)
        );
        setFilteredHospitals(results);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url(${bedImage})` }} // Updated background image
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">Bed Availability</h1>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-medium mb-2">
                        Select Location
                    </label>
                    <select
                        id="location"
                        className="w-full p-2 rounded-lg text-black"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                    >
                        <option value="">-- Choose a Location --</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedLocation && (
                    <div className="mb-4">
                        <label htmlFor="bedType" className="block text-lg font-medium mb-2">
                            Select Bed Type
                        </label>
                        <select
                            id="bedType"
                            className="w-full p-2 rounded-lg text-black"
                            value={selectedBedType}
                            onChange={handleBedTypeChange}
                        >
                            <option value="">-- Choose a Bed Type --</option>
                            {bedTypes.map((bedType) => (
                                <option key={bedType} value={bedType}>
                                    {bedType}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {filteredHospitals.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Hospitals with Available Beds</h2>
                        <ul className="list-disc list-inside">
                            {filteredHospitals.map((hospital) => (
                                <li key={hospital.name} className="text-lg">
                                    {hospital.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedBedType && filteredHospitals.length === 0 && (
                    <div className="mt-6">
                        <p className="text-lg text-center text-red-500">
                            No hospitals found with the selected bed type in this location.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BedAvailability;