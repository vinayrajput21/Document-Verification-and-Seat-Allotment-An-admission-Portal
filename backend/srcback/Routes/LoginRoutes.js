const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/LoginCont.js'); // Replace with the actual path

router.post('/login', loginUser);

module.exports = router;
