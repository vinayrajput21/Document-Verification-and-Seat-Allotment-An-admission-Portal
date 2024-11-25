// controllers/Admin.controller.js
const Admin = require('../Models/LoginAdmin.model.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../Middleware/tokengenerate.js');

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    console.log('AdminId :',adminId);
    console.log('Password :',password);

    // Check if the admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid adminId or password' });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid adminId or password' });
    }

    // Generate JWT token for the admin
    const token = generateToken({ _id: admin._id, adminId: admin.adminId });

    // Respond with the token
    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
