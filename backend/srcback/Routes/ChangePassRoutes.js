const express = require('express');
const router = express.Router();
const { changePassword } = require('../Controllers/ChangePassCont.js');
const authenticateToken = require('../Middleware/Authenticate.js'); // Middleware to verify JWT

// Change Password Route
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
