const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your DB connection

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incorrectAnswers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answerType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Question;
