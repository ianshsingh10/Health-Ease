import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import User from './models/userModel.js';
import Appointment from './models/Appointment.js';
import bcrypt from 'bcrypt';
import { database } from './config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Register route
app.post('/register', async (req, res) => {
    try {
        const { uniqueId, username, email, phoneNo, password } = req.body;

        if (!uniqueId || !username || !email || !phoneNo || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({
            $or: [{ uniqueId }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this username or email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            uniqueId,
            username,
            email,
            phoneNo,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({ message: 'Error registering user' });
    }
});

// Appointment booking route
app.post('/appointments', async (req, res) => {
  const { doctor, date, time, email, phone, patientName } = req.body;

  try {
    // Save the appointment to the database
    const newAppointment = new Appointment({
      patientName, // Added patientName to the schema
      doctorName: doctor.name, // Access doctor properties from the sent object
      specialty: doctor.specialty,
      location: doctor.location,
      charges: doctor.charges,
      date,
      time,
      email,
      phone,
    });

    await newAppointment.save();
    res.status(200).send({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).send({ message: 'Error booking appointment' });
  }
});

// User routes
app.use('/api/users', userRoutes);

// Connect to the database
mongoose.connect(database)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
