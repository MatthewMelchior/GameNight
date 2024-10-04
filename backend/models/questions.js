const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your DB connection

const Question = sequelize.define('Question', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Question;
