const jwt = require('jsonwebtoken');


// Secret key for JWT
const JWT_SECRET =  process.env.ACCESS_TOKEN;

// Function to generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
