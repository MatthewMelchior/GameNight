const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your DB connection

const Answer = sequelize.define('Answer', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  answerType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isCorrect: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = Answer;
