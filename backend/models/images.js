const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Image = sequelize.define('Image', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
