const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const Game = require('../models/games');

router.get('/', isAuthenticated, async (req, res) => {
  const userId = req.session.userId
  const games = await Game.findAll({
    where: {
      userId: userId,  
    },
  });

  if (games.length === 0) {
    return res.status(404).json({ message: 'No games found for this user' });
  }

  res.json(games);  // Send the list of games in the response
});

router.post('/', isAuthenticated, async (req, res) => {
  const userId = req.session.userId
  const game = await Game.create({
    userId: userId
  });

  res.status(201).json({ message: 'Game created successfully', game: game.id });
});

router.delete('/:gameId', isAuthenticated, async (req, res) => {
  const { gameId } = req.params;
  const userId = req.session.userId

  try {
    // Find the game by the given gameId
    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });  // Return 404 if game does not exist
    }

    // Check if the user is the owner of the game
    if (game.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to delete this game' });
    }

    // If authorized, delete the game
    await game.destroy();

    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/view/:gameId', isAuthenticated, async (req, res) => {

  const { gameId } = req.params;
  const userId = req.session.userId

  if (!gameId || gameId <= 0) {
    return res.status(400).json({ error: "invalid Id" });
  }

  try {
    const game = await Game.findByPk(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    if (game.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to view this post' });

    }

    res.status(200).json({ game: game });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;