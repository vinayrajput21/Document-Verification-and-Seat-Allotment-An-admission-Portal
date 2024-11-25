const RegisterUser = require('../Models/Register.model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { generateToken } = require('../Middleware/tokengenerate.js');
// Function to generate a unique applicationId
const generateApplicationId = () => {
  return `APP-${Math.floor(100000 + Math.random() * 900000)}`; // Generates a 6-digit random number
};

// Function to generate a random password
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Create a transporter object using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // For example, you can use 'gmail'
  auth: {
      user: 'samplemailvinay@gmail.com', // Your email
      pass: process.env.EMAIL_PASSKEY, // Your email password or app password
  },
});

// Register new user
exports.registerUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, email, mobile, captcha, consent } = req.body;

    // Check if the user already exists
    let existingUser = await RegisterUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered with this email' });
    }

    // Generate applicationId and random password
    const applicationId = generateApplicationId();
    const password = generateRandomPassword();  // Generate a random password

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the generated applicationId and hashed password
    const newUser = new RegisterUser({
      name,
      email,
      mobile,
      captcha,
      consent,
      applicationId,   // Assign generated applicationId
      password: hashedPassword,  // Store the hashed password
    });

    // Save the new user to the database
    await newUser.save();

     // Send the plain password to the user via email
     const mailOptions = {
      from: 'samplemailvinay@gmail.com', // Sender address
      to: email, // List of receivers
      subject: 'Your Registration Details', // Subject line
      text: `Dear ${name},\n\nThank you for registering. You can use credentials for login:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease keep this information secure.\n\nBest regards,\nYour Vinay`, // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Error sending email:', error);
      }
      console.log('Email sent:', info.response);
  });

  const token = generateToken({ _id: newUser._id, email: newUser.email });
    // Optionally send the plain password to the user via email or display it
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        applicationId: newUser.applicationId,
        token:token
      },
      plainPassword: password, // Send plain password (You can also send it via email)
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
