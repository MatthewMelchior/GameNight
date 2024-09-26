const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your DB connection

const Game = sequelize.define('Game', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Game;
