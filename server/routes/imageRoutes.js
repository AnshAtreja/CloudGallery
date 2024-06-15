const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/Image');
const authMiddleware = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { userId } = req.userData;
    const { path } = req.file;

    const newImage = new Image({
      user: userId,
      imageUrl: path
    });

    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const images = await Image.find({ user: userId });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/fetch', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default page is 1
  const limit = parseInt(req.query.limit) || 9; // Default limit is 9
  const userId = req.userData.userId; 

  try {
    const images = await Image.find({ user: userId }) 
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
