
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../Models/LoginAdmin.model.js'); // Adjust path as necessary


const createAdminUser = async () => {
  try {
    const adminId = '12345'; // Admin adminId
    const password = 'manjeet'; // Set a strong admin password

    // Check if admin already exists
    // const existingAdmin = await Admin.findOne({ adminId });
    // if (existingAdmin) {
    //   console.log('Admin user already exists');
    //   return;
    // }
    mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Could not connect to MongoDB:', err));
      

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newAdmin = new Admin({
      adminId,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();
