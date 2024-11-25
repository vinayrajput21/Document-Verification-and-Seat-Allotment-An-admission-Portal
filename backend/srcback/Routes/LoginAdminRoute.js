// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../ControllerAdmin/LoginAdminCont.js');

// Admin login route
router.post('/loginAdmin', loginAdmin);

module.exports = router;
