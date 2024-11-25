const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitApplication } = require('../Controllers/YourProfile.Cont.js'); // Adjust the path as needed

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage: storage });

// POST route for application submission
router.post('/apply', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'xthMarksheet', maxCount: 1 },
  { name: 'xiithMarksheet', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'domicileCertificate', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 }
]), submitApplication); // Use the submitApplication controller

module.exports = router;
