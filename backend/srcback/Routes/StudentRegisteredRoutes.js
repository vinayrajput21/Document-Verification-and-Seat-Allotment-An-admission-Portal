const express = require('express');
const router = express.Router();
const { getStudentsByCourse } = require('../ControllerAdmin/StudentRegisteredCont.js');
const authenticateToken = require('../Middleware/Authenticate.js'); // Import middleware

// Route to fetch students based on the selected course, protected by token authentication
router.get('/studentsRegistered', authenticateToken, getStudentsByCourse);

module.exports = router;
