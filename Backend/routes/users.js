import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../models/userModel.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { jwtSecret } from '../config.js';
import { authMiddleware } from './middleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Error logging in' });
    }
});

// Get user by username
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Error fetching user' });
    }
});

// Update user
router.put('/:username', upload.single('image'), async (req, res) => {
    try {
        const { username, dob, age, medicalHistory, bloodGroup } = req.body;
        let updateData = { username, dob, age, medicalHistory, bloodGroup };

        if (req.file) {
            const imageBase64 = req.file.buffer.toString('base64');
            updateData.image = imageBase64;
        }

        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Error updating user' });
    }
});

// Book Appointment route (with user authentication)
router.post('/appointments', authMiddleware, async (req, res) => {
    try {
        const { doctorName, specialty, location, fees, patientName, email, phone, date, time } = req.body;
        if (!doctorName || !specialty || !location || !fees || !patientName || !email || !phone || !date || !time) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const username = req.user.username;
        const appointment = new Appointment({
            username,
            doctorName,
            specialty,
            location,
            fees,
            patientName,
            email,
            phone,
            date,
            time,
        });

        await appointment.save();
        res.status(200).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Error booking appointment' });
    }
});

// Get appointments for the logged-in user
router.get('/appointments', authMiddleware, async (req, res) => {
  try {
    const username = req.user.username; // Retrieve username from authenticated user

    // Find appointments for the logged-in user
    const appointments = await Appointment.find({ username }).exec();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments.' });
  }
});

export default router;
