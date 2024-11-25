
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/RegisterRoutes.js');
const YourProfileRoutes = require('./Routes/YourProfileRoutes.js');
const LoginRoutes = require('./Routes/LoginRoutes.js');
const ChangePassRoutes = require('./Routes/ChangePassRoutes.js');
const ChangePassAdminRoutes = require('./Routes/ChangePassAdminRoutes.js');
const GenPDFRoutes = require('./Routes/GenPDFRoutes.js');
const LoginAdminRoute = require('./Routes/LoginAdminRoute.js');
const StudentRegisteredRoutes = require('./Routes/StudentRegisteredRoutes.js');
const PaymentRoutes = require('./Routes/PaymentRoutes.js');
const MeritListRoute = require('./Routes/MeritListRoute.js');
const CategoryRoute = require('./Routes/CategoryRoute.js');
const FetchMeritRoute = require('./Routes/FetchMeritRoute.js');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors());

// Middleware for parsing JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/YourProfile', YourProfileRoutes);
app.use('/api/Login', LoginRoutes);
app.use('/api/changepass', ChangePassRoutes);
app.use('/api/PDF', GenPDFRoutes);
app.use('/api/LoginAdmin', LoginAdminRoute);
app.use('/api/changepassAdmin', ChangePassAdminRoutes);
app.use('/api/StuReg', StudentRegisteredRoutes);
app.use('/api/Pay', PaymentRoutes);
app.use('/api/Sort', MeritListRoute);
app.use('/api/Cate', CategoryRoute);
app.use('/api/FetchMerit', FetchMeritRoute);

// Start the server
app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT_NUMBER}`);
});

