const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

// Assume you're using Express.js for the backend
router.get('/', isAuthenticated, (req, res) => {
  const games = [
    { id: 1, title: 'General Knowledge Quiz', createdAt: '2023-09-01' },
    { id: 2, title: 'Pop Culture Trivia', createdAt: '2023-09-05' },
  ];
  res.json(games);
});

module.exports = router;