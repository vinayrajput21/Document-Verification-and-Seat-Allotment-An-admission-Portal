// controllers/studentController.js
const Student = require('../Models/YourProfile.model.js');

// Fetch students based on course
exports.getStudentsByCourse = async (req, res) => {
  try {
    const { course } = req.query; // Get course from query parameters
    console.log('Course :' , course);
    if (!course) {
      return res.status(400).json({ message: 'Course parameter is required' });
    }
    const students = await Student.find({ "basicDetails.programApplied": course });

    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error. Could not fetch students.' });
  }
};
