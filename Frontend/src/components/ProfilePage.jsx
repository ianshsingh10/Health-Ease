import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        username: '',
        dob: '',
        age: '',
        medicalHistory: '',
        image: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${username}`);
                setUserData(response.data);
                setUpdatedData({
                    username: response.data.username,
                    dob: response.data.dob,
                    age: response.data.age,
                    medicalHistory: response.data.medicalHistory,
                    image: response.data.image,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${username}`, updatedData);
            setUserData(response.data);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>

            {!isEditing ? (
                <div>
                    <img src={userData.image} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>DOB:</strong> {userData.dob}</p>
                    <p><strong>Medical History:</strong> {userData.medicalHistory}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleUpdateSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedData.username}
                            onChange={handleInputChange}
                            className="mt-2 p-2 border"
                        />
                    </div>
                    <div>
                        <label>DOB</label>
                        <input
                            type="date"
                            name="dob"
                            value={updatedData.dob}
                            onChange={handleInputChange}
                            className="mt-2 p-2 border"
                        />
                    </div>
                    <div>
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={updatedData.age}
                            onChange={handleInputChange}
                            className="mt-2 p-2 border"
                        />
                    </div>
                    <div>
                        <label>Medical History</label>
                        <textarea
                            name="medicalHistory"
                            value={updatedData.medicalHistory}
                            onChange={handleInputChange}
                            className="mt-2 p-2 border"
                        />
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
