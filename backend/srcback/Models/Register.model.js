const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Assuming 10 digit mobile number format
  },
  captcha: {
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
    default: false,
  },
  applicationId: {
    type: String,
    required: true, // applicationId is still required
  },
  password: {
    type: String,
    required: true, // Password is required
  },
}, {
  timestamps: true,
});

const RegisterUser = mongoose.model('RegisterUser', userSchema);
module.exports = RegisterUser;
