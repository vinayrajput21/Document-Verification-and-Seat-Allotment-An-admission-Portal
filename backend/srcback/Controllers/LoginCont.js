const User = require('../Models/Register.model.js');
const Profile = require('../Models/YourProfile.model.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../Middleware/tokengenerate.js');

// Login user and fetch profile
exports.loginUser = async (req, res) => {
    try {
            // POST request (Login)
            const { email, password } = req.body;
            console.log('Email:', email);
            console.log('Password:', password);

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Check if the provided password matches the stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const token = generateToken({ _id: user._id, email: user.email });

            // Send the token and user details in response
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    _id: user._id,
                    email: user.email
                },
                token // Return the token to the frontend
            });

      
    } catch (error) {
        console.error('Error during login or profile fetch:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
