// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { changePassword } = require('../ControllerAdmin/ChangePassAdminCont.js');
const authenticateToken = require('../Middleware/Authenticate.js');

router.post('/change-password-admin', authenticateToken, changePassword);

module.exports = router;
