const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload');
const Image = require('../models/images');

router.post('/', isAuthenticated, upload.single('file'), async (req, res) => {
  try {
    // Save file path in the database using Sequelize
    const fileName = req.file.filename;

    const newImage = await Image.create({ fileName });

    res.status(200).json({
      message: 'File uploaded and saved to DB',
      filename: newImage.filename,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

module.exports = router;