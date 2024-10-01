const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const { Question } = require('../models');

// GET
router.get('/:questionId', isAuthenticated, async (req, res) => {
  const { questionId } = req.params;
  const userId = req.session.userId

  if (!questionId || questionId <= 0) {
    return res.status(400).json({ error: "Invalid questionId" });
  }

  try {
    const question = await Question.findByPk(questionId, {
      include: [{ model: Answer, as: 'answers' }]
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the user is the owner of the game
    if (question.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to view this question' });
    }


    res.status(200).json({ question });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST
router.post('/', isAuthenticated, async (req, res) => {
  const userId = req.session.userId
  const { content, questionType, duration, imageId, gameId } = req.body;

  const question = await Question.create({
    userId: userId,
    content: content,
    questionType: questionType,
    duration: duration,
    imageId: imageId,
    gameId: gameId,
  });

  res.status(201).json({ message: 'question created successfully', questionId: question.id });
});

// DELETE
router.delete('/:questionId', isAuthenticated, async (req, res) => {
  const { questionId } = req.params;
  const userId = req.session.userId

  try {
    // Find the game by the given gameId
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });  // Return 404 if game does not exist
    }

    // Check if the user is the owner of the game
    if (question.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to delete this question' });
    }

    // If authorized, delete the game
    await question.destroy();

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting Question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH
router.patch('/:questionId', isAuthenticated, async (req, res) => {
  const { questionId } = req.params;
  const { content, duration, questionType, imageId, } = req.body;
  const userId = req.session.userId

  if (!questionId || questionId <= 0) {
    return res.status(400).json({ error: "Invalid questionId" });
  }

  try {
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.userId !== userId) {
      return res.status(403).json({ error: "You are unauthorized to edit this message" });
    }

    // Update the question fields
    if (content !== undefined) question.content = content;
    if (duration !== undefined) question.duration = duration;
    if (questionType !== undefined) question.questionType = questionType;
    if (imageId !== undefined) question.imageId = imageId

    // Save the updated question
    await question.save();

    res.status(200).json({ message: 'Question updated successfully', question });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

