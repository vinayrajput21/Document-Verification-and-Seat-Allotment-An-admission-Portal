import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MeritListAllocation() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [meritList, setMeritList] = useState([]);
  const [categories, setCategories] = useState(null);
  const [allocatedSeats, setAllocatedSeats] = useState({});
  const [showSendMessages, setShowSendMessages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      fetchCategories();
      fetchMeritList();
    }
  }, [selectedCourse]);

  // Fetch the merit list from the backend
  const fetchMeritList = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/FetchMerit/meritlist', { course: selectedCourse });
      setMeritList(response.data.MeritList);
      alert("Merit list fetched successfully");
    } catch (error) {
      console.error('Error fetching merit list:', error);
      setError('Failed to fetch merit list.');
      alert("Merit list not fetched");
    }
  };

  // Fetch category data based on the selected course
  const fetchCategories = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/Cate/category', { course: selectedCourse });
      setCategories(response.data.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch category data.');
    }
  };

  // Handle course change
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setCategories(null);
    setAllocatedSeats({});
    setShowSendMessages(false);
  };

  // Allocate seats based on merit list and category seats
  const allocateSeats = () => {
    if (!meritList.length || !categories) {
      setError('Merit list or category data is not available.');
      return;
    }

    const categorySeats = { ...categories }; // Clone category data to track seat availability
    const allocation = {}; // Object to store seat allocation results

    // Sort the merit list by entrance marks (highest to lowest)
    const sortedMeritList = [...meritList].sort((a, b) => b.entranceMark - a.entranceMark);

    // Iterate through the sorted merit list and allocate seats
    sortedMeritList.forEach((candidate) => {
      const category = candidate.basicDetails.category;

      if (categorySeats[category] > 0) {
        // Allocate seat if available
        allocation[candidate.applicationId] = { ...candidate, seatAllotted: true };
        categorySeats[category] -= 1; // Decrement available seats for this category
      } else {
        // No seats available
        allocation[candidate.applicationId] = { ...candidate, seatAllotted: false };
      }
    });

    setAllocatedSeats(allocation);
    setShowSendMessages(true);
    setError(null);
  };
  const sendMessages = () => {
    // const allocatedCandidates = Object.values(allocatedSeats).filter((candidate) => candidate.seatAllotted);

    // // Simulate sending messages (replace with your logic to send messages)
    // allocatedCandidates.forEach((candidate) => {
    //   console.log(`Message sent to: ${candidate.name}, Application ID: ${candidate.applicationId}`);
    // });

    // alert(`Messages sent to ${allocatedCandidates.length} students.`);
  };

  return (
    <div>
      <h1>Merit List Seat Allocation</h1>

      {/* Select Course Dropdown */}
      <label htmlFor="course">Select your course:</label>
      <select id="course" value={selectedCourse} onChange={handleCourseChange}>
        <option value="">-- Select Course --</option>
        <option value="Btech">Btech</option>
        <option value="Mca">MCA</option>
        <option value="BE">BE</option>
        <option value="Mba">MBA</option>
        <option value="Bca">BCA</option>
      </select>

     

      {/* Display allocated results */}
      {Object.keys(allocatedSeats).length > 0 && (
        <div>
          <h2 style={{ marginTop:"30px",marginBottom:"10px" }}>Seat Allocation Results</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Entrance Marks</th>
                <th>Seat Allotted</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(allocatedSeats).map((candidate) => (
                <tr key={candidate.applicationId}>
                  <td>{candidate.applicationId}</td>
                  <td>{candidate.basicDetails.name}</td>
                  <td>{candidate.basicDetails.category}</td>
                  <td>{candidate.entranceMark}</td>
                  <td>{candidate.seatAllotted ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       {categories && (
        <button onClick={allocateSeats} style={{ width:"146px",marginBottom: '20px' }}>
          Allocate Seats
        </button>
      )}
        {/* Display "Send Messages" button */}
        {showSendMessages && (
        <button onClick={sendMessages} style={{width:"146px", marginTop: '20px',marginLeft:"20px", color: 'white',  }}>
          Send Messages
        </button>
      )}

      {/* Display available categories and seats
      {categories && (
        <div>
          <h2>Available Seats by Category</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categories).map(([category, seats]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
}
