const express = require('express');
const { createOrder, verifyPayment } = require('../ControllerAdmin/PaymentCont.js');

const router = express.Router();

// Route to create a Razorpay order
router.post('/order', createOrder);

// Optional: Route to verify the payment (use if needed)
router.post('/verify', verifyPayment);

module.exports = router;
