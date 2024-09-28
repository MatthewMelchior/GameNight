const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your DB connection

const Game = sequelize.define('Game', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    defaultValue: "New Game",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Game;
