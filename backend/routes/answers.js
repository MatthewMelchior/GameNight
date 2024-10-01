const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const { Answer } = require('../models');

// GET
router.get('/:answerId', isAuthenticated, async (req, res) => {
  const { answerId } = req.params;
  const userId = req.session.userId

  if (!answerId || answerId <= 0) {
    return res.status(400).json({ error: "Invalid answerId" });
  }

  try {
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if the user is the owner of the game
    if (answer.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to delete this question' });
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error fetching answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST
router.post('/', isAuthenticated, async (req, res) => {
  const userId = req.session.userId
  const { content, questionId, imageId, answerType, isCorrect } = req.body;
  
  const answer = await Answer.create({
    userId: userId,
    content: content,
    questionId: questionId,
    imageId: imageId,
    answerType: answerType,
    isCorrect: isCorrect,
  });

  res.status(201).json({ message: 'answer created successfully', answerId: answer.id });
});

// DELETE
router.delete('/:answerId', isAuthenticated, async (req, res) => {
  const { answerId } = req.params;
  const userId = req.session.userId

  try {
    // Find the game by the given gameId
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });  // Return 404 if game does not exist
    }

    // Check if the user is the owner of the game
    if (answer.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to delete this answer' });
    }

    // If authorized, delete the game
    await answer.destroy();

    res.status(200).json({ message: 'answer deleted successfully' });
  } catch (error) {
    console.error('Error deleting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH
router.patch('/:answerId', isAuthenticated, async (req, res) => {
  const { answerId } = req.params;
  const { content, imageId, answerType, isCorrect } = req.body;
  const userId = req.session.userId

  if (!answerId || answerId <= 0) {
    return res.status(400).json({ error: "Invalid answerId" });
  }

  try {
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      return res.status(404).json({ error: "answer not found" });
    }

    if (answer.userId !== userId) {
      return res.status(403).json({ error: "You are unauthorized to edit this answer" });
    }

    // Update the question fields
    if (content !== undefined) answer.content = content;
    if (imageId !== undefined) answer.imageId = imageId;
    if (answerType !== undefined) answer.answerType = answerType;
    if (isCorrect !== undefined) answer.isCorrect = isCorrect

    // Save the updated question
    await answer.save();

    res.status(200).json({ message: 'answer updated successfully', answer });
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
