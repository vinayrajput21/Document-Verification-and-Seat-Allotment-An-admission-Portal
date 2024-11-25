
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  applicationId: { type: String, required: true },
  entranceMark: { type: Number, required: true },
  basicDetails: {
    name: { type: String, required: true },
    fatherName: { type: String },
    motherName: { type: String },
    dob: { type: Date, required: true },
    mobileNo: { type: String },
    email: { type: String, required: true },
    category: { type: String },
  },
  course: { type: String, required: true }, // To link the student to a course
});

const Student = mongoose.model('MeritList', StudentSchema);
module.exports = Student;
