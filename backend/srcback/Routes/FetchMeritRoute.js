const express = require('express');
const router = express.Router();
const { getMeritlistByCourse } = require('../ControllerAdmin/FetchMeritCont.js'); // Adjust the path as needed

// Route for fetching merit list by course
router.post('/meritlist', getMeritlistByCourse);

module.exports = router;
