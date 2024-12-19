import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../models/userModel.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { jwtSecret } from '../config.js';

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
// Assuming you have a route to create appointments
router.post('/appointments', async (req, res) => {
    try {
      const { patientName, email, phone, doctor, date, time } = req.body;
  
      const newAppointment = new Appointment({
        patientName,
        email,
        phone,
        doctor,
        date,
        time,
      });
  
      await newAppointment.save();
      res.status(200).send({ message: 'Appointment booked successfully!' });
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).send({ message: 'Error booking appointment' });
    }
  });

// In your routes for appointments

// Get appointments for a specific user
router.get('/:userId/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId })
            .populate('doctorId', 'name specialty') // Populate doctor details
            .exec();
        
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments.' });
    }
});

export default router;
