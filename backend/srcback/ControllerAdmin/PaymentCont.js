const Razorpay = require('razorpay');

// Initialize Razorpay instance with your credentials
const razorpayInstance = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
  key_secret: 'YOUR_RAZORPAY_SECRET', // Replace with your Razorpay Secret
});

// Generate Order for Payment
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in INR
    const options = {
      amount: amount * 100, // Razorpay expects amount in the smallest unit (paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
};

// Payment Verification (optional, if you want to verify the payment at the backend)
const verifyPayment = async (req, res) => {
  const crypto = require('crypto');
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac('sha256', 'YOUR_RAZORPAY_SECRET')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
