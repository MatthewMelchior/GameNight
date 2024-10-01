const Game = require('./games');
const Question = require('./questions');
const Answer = require('./answers');
const Image = require('./images');
const User = require('./users');

// Define associations
Answer.belongsTo(Question, { foreignKey: 'questionId' });

Game.hasMany(Question, { foreignKey: 'gameId', as: 'questions' });

Question.belongsTo(Game, { foreignKey: 'gameId' });
Question.hasMany(Answer, { as: 'answers', foreignKey: 'questionId' });

module.exports = {
  Game,
  Question,
  Answer,
  Image,
  User,
};
