const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const Question = require('../models/Question');

// Assume you're using Express.js for the backend
router.get('/', isAuthenticated, (req, res) => {
  res.json("questions health check");
});

module.exports = router;