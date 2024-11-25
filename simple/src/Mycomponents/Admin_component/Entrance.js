import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function StudentRegistered() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [entranceMarks, setEntranceMarks] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    setSubmitted(false); // Reset submit state when course changes
    if (course) {
      fetchStudents(course);
    } else {
      setStudents([]);
    }
  };

  const fetchStudents = async (course) => {
    const adminToken = localStorage.getItem('adminToken');

    try {
      const response = await axios.get(`http://localhost:3001/api/StuReg/studentsRegistered`, {
        params: { course },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setStudents(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Could not fetch students. Please try again later.');
    }
  };

  const handleMarksChange = (event, id) => {
    setEntranceMarks({
      ...entranceMarks,
      [id]: event.target.value,
    });
  };

  const handleSubmit = async () =>  {
    const updatedStudents = students.map((student) => ({
      ...student,
      entranceMark: parseInt(entranceMarks[student._id] || 0, 10), // Default to 0 if no mark entered
    }));

    updatedStudents.sort((a, b) => {
      if (b.entranceMark !== a.entranceMark) {
        return b.entranceMark - a.entranceMark; // Higher marks first
      }
      return new Date(a.basicDetails.dob) - new Date(b.basicDetails.dob); // Older students first
    });

    setStudents(updatedStudents);
    setSubmitted(true);
    console.log('Sorted and Submitted Data:', updatedStudents);

    try {
      const adminToken = localStorage.getItem('adminToken');
      await axios.post(
        'http://localhost:3001/api/Sort/storeSorted',
        { course: selectedCourse, students: updatedStudents },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      alert('Students stored successfully!');
    } catch (error) {
      console.error('Error storing students:', error);
      alert('Failed to store sorted students.');
    }
  };

  const exportToExcel = () => {
    const data = students.map((student) => ({
      'Entrance Marks': student.entranceMark || '',
      'Applicant ID': student.applicationId,
      Name: student.basicDetails.name,
      "Father's Name": student.basicDetails.fatherName,
      "Mother's Name": student.basicDetails.motherName,
      DOB: new Date(student.basicDetails.dob).toLocaleDateString(),
      'Mobile No': student.basicDetails.mobileNo,
      Email: student.basicDetails.email,
      Category: student.basicDetails.category,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Data');
    XLSX.writeFile(workbook, `Students_${selectedCourse}.xlsx`);
  };

  return (
    <div>
      <label htmlFor="course">Select your course:</label>
      <select id="course" value={selectedCourse} onChange={handleCourseChange}>
        <option value="">-- Select Course --</option>
        <option value="Btech">Btech</option>
        <option value="Mca">MCA</option>
        <option value="BE">BE</option>
        <option value="Mba">MBA</option>
        <option value="Bca">BCA</option>
      </select>

      {selectedCourse && (
        <div>
          <p>You have selected: {selectedCourse}</p>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : students.length > 0 ? (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Entrance Marks</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Applicant ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Father's Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Mother's Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>DOB</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Mobile No</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <input
                        type="number"
                        value={entranceMarks[student._id] || ''}
                        onChange={(event) => handleMarksChange(event, student._id)}
                        disabled={submitted} // Disable input after submission
                      />
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.applicationId}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.fatherName}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.motherName}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(student.basicDetails.dob).toLocaleDateString()}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.mobileNo}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.email}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found for this course.</p>
          )}

          {!submitted ? (
            <button onClick={handleSubmit} style={{ marginTop: '10px', width: '200px' }}>
              Submit Entrance Marks
            </button>
          ) : (
            <button
              onClick={exportToExcel}
              style={{
                marginTop: '20px',
                width: '200px',
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Export to Excel
            </button>
          )}
        </div>
      )}
    </div>
  );
}
