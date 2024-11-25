// routes/studentRoutes.js
const express = require('express');
const { storeSortedStudents } = require('../ControllerAdmin/MeritListCont.js');
const router = express.Router();

// POST /api/students/storeSorted
router.post('/storeSorted', storeSortedStudents);

module.exports = router;
