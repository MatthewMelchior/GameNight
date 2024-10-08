const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const { Answer, Question, Game } = require('../models');
const { Op } = require('sequelize');

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
  const userId = req.session.userId;

  if (!gameId || gameId <= 0) {
    return res.status(400).json({ error: "Invalid gameId" });
  }

  try {
    // Find the game by primary key, including its questions and answers
    const game = await Game.findByPk(gameId, {
      include: [{
        model: Question,
        as: 'questions',  // Assuming 'questions' is the alias for the association
        include: [{
          model: Answer,
          as: 'answers',  // Assuming 'answers' is the alias for the association
        }]
      }]
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Check if the user is authorized to view this game
    if (game.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to view this game' });
    }

    // Respond with the game, its questions, and answers
    res.status(200).json({ game });

  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/save/:gameId', isAuthenticated, async (req, res) => {
  const { gameId } = req.params;
  const { game } = req.body;
  const userId = req.session.userId;

  try {
    // Find the game to update
    const existingGame = await Game.findByPk(gameId, {
      include: {
        model: Question,
        as: 'questions',
        include: { model: Answer, as: 'answers' },
      },
    });

    if (!existingGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (existingGame.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to view this game' });
    }

    // Update the game
    await existingGame.update({
      name: game.name,
      userId: game.userId,
    });

    // Track the provided question and answer IDs for deletion
    let providedQuestionIds = game.questions
      .filter(q => typeof q.id === 'number')
      .map(q => q.id);

    // Handle questions
    for (const question of game.questions) {
      let questionInstance;
      if (typeof question.id === 'number') {
        // Update existing question
        questionInstance = await Question.findByPk(question.id);
        await questionInstance.update({
          content: question.content,
          questionType: question.questionType,
          duration: question.duration,
          image: question.image,
        });
      } else {
        // Create new question
        questionInstance = await Question.create({
          content: question.content,
          questionType: question.questionType,
          duration: question.duration,
          image: question.image,
          gameId: existingGame.id,
          userId: userId,
        });
        providedQuestionIds.push(questionInstance.id);
      }

      // Track the provided answer IDs for deletion
      let providedAnswerIds = question.answers
        .filter(a => typeof a.id === 'number')
        .map(a => a.id);

      // Handle answers for each question
      for (const answer of question.answers) {
        let answerInstance;
        if (typeof answer.id === 'number') {
          // Update existing answer
          answerInstance = await Answer.findByPk(answer.id);
          await answerInstance.update({
            content: answer.content,
            answerType: answer.answerType,
            isCorrect: answer.isCorrect ? 1 : 0,
            imageId: answer.imageId,
          });
        } else {
          // Create new answer
          answerInstance = await Answer.create({
            content: answer.content,
            answerType: answer.answerType,
            isCorrect: answer.isCorrect ? 1 : 0,
            imageId: answer.imageId,
            questionId: questionInstance.id,
            userId: userId,
          });
          providedAnswerIds.push(answerInstance.id);
        }
      }

      // Delete answers not provided
      await Answer.destroy({
        where: {
          questionId: questionInstance.id,
          id: { [Op.notIn]: providedAnswerIds },
        },
      }); 
    }

    // Delete questions not provided
    await Question.destroy({
      where: {
        gameId: existingGame.id,
        id: { [Op.notIn]: providedQuestionIds },
      },
    });

    res.status(200).json({ message: 'Game state updated successfully' });
  } catch (error) {
    console.error('Error updating game state:', error);
    res.status(500).json({ error: 'An error occurred while updating the game state' });
  }
});

module.exports = router;