// Routes/GenPDFRoutes.js
const express = require('express');
const router = express.Router();
const { generatePDF } = require('../Controllers/GenPDFCont.js'); // Adjust the path as necessary
const authenticateToken = require('../Middleware/Authenticate.js'); // Middleware to authenticate token

// Define the route for generating the PDF
router.get('/genpdf', authenticateToken, generatePDF); // Use the auth middleware

module.exports = router;