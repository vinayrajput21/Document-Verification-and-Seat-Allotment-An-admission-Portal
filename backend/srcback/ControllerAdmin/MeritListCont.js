// controllers/studentController.js
const Student = require('../Models/AfterEntrance.model.js');

exports.storeSortedStudents = async (req, res) => {
  try {
    const { course, students } = req.body;

    if (!course || !students || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Invalid data format.' });
    }

    // Delete existing students for the course to avoid duplicates
    await Student.deleteMany({ course });

    // Save the sorted students into the database
    const studentDocs = students.map((student) => ({
      applicationId: student.applicationId,
      entranceMark: student.entranceMark,
      basicDetails: {
        name: student.basicDetails.name,
        fatherName: student.basicDetails.fatherName,
        motherName: student.basicDetails.motherName,
        dob: new Date(student.basicDetails.dob),
        mobileNo: student.basicDetails.mobileNo,
        email: student.basicDetails.email,
        category: student.basicDetails.category,
      },
      course,
    }));

    await Student.insertMany(studentDocs);

    res.status(201).json({ message: 'Students stored successfully!' });
  } catch (error) {
    console.error('Error storing sorted students:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
