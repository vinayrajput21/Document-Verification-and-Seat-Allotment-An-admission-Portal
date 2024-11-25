import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function StudentRegistered() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
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

  // Function to export data to Excel
  const exportToExcel = () => {
    // Prepare the worksheet with student data
    const worksheet = XLSX.utils.json_to_sheet(
      students.map((student) => ({
        'Applicant ID': student.applicationId,
        'Name': student.basicDetails.name,
        "Father's Name": student.basicDetails.fatherName,
        "Mother's Name": student.basicDetails.motherName,
        'Session': student.basicDetails.session,
        'DOB': new Date(student.basicDetails.dob).toLocaleDateString(),
        'Mobile No': student.basicDetails.mobileNo,
        'Email': student.basicDetails.email,
        'Aadhar No': student.basicDetails.aadharNo,
        'Program Type': student.basicDetails.programType,
        'Program Applied': student.basicDetails.programApplied,
        'Nationality': student.basicDetails.nationality,
        'Gender': student.basicDetails.gender,
        'Marital Status': student.basicDetails.maritalStatus,
        'Religion': student.basicDetails.religion,
        'Category': student.basicDetails.category,
        'Sub Category': student.basicDetails.subCategory || 'N/A',
        'Caste': student.basicDetails.caste || 'N/A',
        "Father's Occupation": student.basicDetails.fatherOccupation,
        'Family Income': student.basicDetails.familyIncome,
        "Father's Contact": student.basicDetails.fatherContact || 'N/A',
      }))
    );
    
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Export to Excel file
    XLSX.writeFile(workbook, `${selectedCourse}_students.xlsx`);
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
            <div>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Applicant ID</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Father's Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Mother's Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Session</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>DOB</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Mobile No</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Aadhar No</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Program Type</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Program Applied</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Nationality</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Marital Status</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Religion</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Sub Category</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Caste</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Father's Occupation</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Family Income</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Father's Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.applicationId}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.name}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.fatherName}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.motherName}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.session}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(student.basicDetails.dob).toLocaleDateString()}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.mobileNo}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.email}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.aadharNo}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.programType}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.programApplied}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.nationality}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.gender}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.maritalStatus}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.religion}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.category}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.subCategory || 'N/A'}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.caste || 'N/A'}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.fatherOccupation}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.familyIncome}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{student.basicDetails.fatherContact || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                onClick={exportToExcel} 
                style={{ marginTop: '20px',width:'215px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Export to Excel
              </button>
            </div>
          ) : (
            <p>No students found for this course.</p>
          )}
        </div>
      )}
    </div>
  );
}
