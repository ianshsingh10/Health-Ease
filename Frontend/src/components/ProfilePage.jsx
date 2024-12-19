import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const PatientProfilePage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        username: '',
        dob: '',
        medicalHistory: '',
        bloodGroup: '',
        image: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${username}`);
                setUserData(response.data);
                setUpdatedData({
                    username: response.data.username,
                    dob: response.data.dob,
                    medicalHistory: response.data.medicalHistory,
                    bloodGroup: response.data.bloodGroup,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUserAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patients/${username}/appointments`);
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchUserData();
        fetchUserAppointments();
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setUpdatedData({ ...updatedData, image: e.target.files[0] });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', updatedData.username);
        formData.append('dob', updatedData.dob);
        formData.append('medicalHistory', updatedData.medicalHistory);
        formData.append('bloodGroup', updatedData.bloodGroup);
        if (updatedData.image) {
            formData.append('image', updatedData.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/users/${username}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUserData(response.data);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    if (!userData) {
        return <div className="text-center p-4">Loading...</div>;
    }

    const age = calculateAge(userData.dob);

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <h1 className="text-4xl font-semibold mb-6 text-center">Patient Profile</h1>

            {/* Patient Profile Display */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={userData.image ? `data:image/png;base64,${userData.image}` : '/default-avatar.png'}
                        alt="Patient Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2">{userData.username}</h2>
                    <p className="text-gray-600">Age: {age}</p>
                    <p className="text-gray-600">DOB: {userData.dob}</p>
                    <p className="text-gray-600">Blood Group: {userData.bloodGroup}</p>
                </div>

                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-lg transition duration-200 hover:bg-blue-700"
                >
                    Edit Profile
                </button>
            </div>

            {/* Edit Profile Form */}
            {isEditing && (
                <form onSubmit={handleUpdateSubmit} className="bg-white shadow-lg rounded-lg p-8 mb-8">
                    <div className="mb-4">
                        <label className="text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedData.username}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 font-semibold">DOB</label>
                        <input
                            type="date"
                            name="dob"
                            value={updatedData.dob}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 font-semibold">Blood Group</label>
                        <input
                            type="text"
                            name="bloodGroup"
                            value={updatedData.bloodGroup}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 font-semibold">Medical History</label>
                        <textarea
                            name="medicalHistory"
                            value={updatedData.medicalHistory}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700 font-semibold">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-lg transition duration-200 hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            )}

            {/* Appointments Section */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-semibold mb-4">Appointments</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
                    <ul className="list-disc pl-6">
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <li key={index} className="text-gray-600">
                                    Appointment with Dr. {appointment.doctorId?.name || 'Unknown Doctor'} ({appointment.doctorId?.specialty || 'Specialty not available'}) on {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.time}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-600">No upcoming appointments</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PatientProfilePage;
