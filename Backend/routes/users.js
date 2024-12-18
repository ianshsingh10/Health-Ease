// routes/users.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { jwtSecret } from '../config.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { uniqueId, username, email, phoneNo, password } = req.body;

        if (!uniqueId || !username || !email || !phoneNo || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ uniqueId });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this unique ID.' });
        }

        const existingUserByUsernameOrEmail = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUserByUsernameOrEmail) {
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
        console.error(error.message);
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
        console.error(error);
        res.status(500).send({ message: 'Error fetching user' });
    }
});

// Update user
router.put('/:username', async (req, res) => {
    try {
        const { username, dob, age, medicalHistory, image } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { username, dob, age, medicalHistory, image },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating user' });
    }
});

export default router;
