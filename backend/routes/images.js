const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/upload');
const { Image } = require('../models');
const path = require('path');

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

// Endpoint for uploading multiple images
router.post('/arr/', isAuthenticated, upload.array('files', 10), async (req, res) => { // Allow up to 10 files
  try {
    // Ensure files are present in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    // Save file paths in the database using Sequelize
    const fileNames = req.files.map(file => file.filename);
    res.status(200).json({
      message: 'Files uploaded',
      fileNames: fileNames,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the files' });
  }
});

router.get('/:filename', isAuthenticated, (req, res) => {
  const filePath = path.join(__dirname, '../../uploads', req.params.filename);
  res.sendFile(filePath);
});

module.exports = router;
