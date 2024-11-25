const express = require('express');
const router = express.Router();
const { getCategoryByCourse } = require('../ControllerAdmin/CategoryCont.js'); // Adjust path to your controller file

// Route to fetch category data based on the selected course
router.post('/category', getCategoryByCourse);

module.exports = router;
