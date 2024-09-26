const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const {isValidPassword, isValidUsername} = require('../utils/users');

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!isValidUsername(username)) return res.status(400).json({ message: 'Invalid username' });
    if (!isValidPassword(password)) return res.status(400).json({ message: 'Invalid password' });

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 5; // You can adjust the number of rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Store user ID in session
        req.session.userId = user.id;

        // Authentication successful, respond with user details or a token
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/users/logout
router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ message: 'Logout successful' });
    });
});

// get is authenticated
router.get('/isAuthenticated', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'authenticated' });;
});

module.exports = router;
