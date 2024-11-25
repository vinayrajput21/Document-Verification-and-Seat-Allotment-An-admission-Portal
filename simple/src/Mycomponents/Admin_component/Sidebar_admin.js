import React, { useState } from 'react';
import '../../cssss/Student_css/Sidebar.css';

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to manage popup visibility

  const handleLogout = () => {
    // Perform logout logic (clear token, redirect, etc.)
    localStorage.removeItem('token'); // Remove token or any other logout actions
    window.location.href = '/'; // Redirect to home page
  };
  return (
    <>
    <div className="sidebar">
      <div className="logo">Admin Dashboard</div>
      <ul>
        {/* Toggle the active class based on the activeComponent state */}
        <li
          className={activeComponent === 'Student_registered' ? 'active' : ''}
          onClick={() => setActiveComponent('Student_registered')}
        >
          Student Registered
        </li>
        <li
          className={activeComponent === 'Entrance' ? 'active' : ''}
          onClick={() => setActiveComponent('Entrance')}
        >
          After Entrance 
        </li>
        <li
          className={activeComponent === 'Seat_alloted' ? 'active' : ''}
          onClick={() => setActiveComponent('Seat_alloted')}
        >
          Seat Alloted
        </li>
        <li
          className={activeComponent === 'password' ? 'active' : ''}
          onClick={() => setActiveComponent('password')}
        >
          Change Password
        </li>
        <li
            className={activeComponent === 'logout' ? 'active' : ''}
            onClick={() => setShowLogoutPopup(true)} // Show logout confirmation popup
            style={{ color: 'red' }}
          >
            Logout 
          </li>
      </ul>
    </div>
    {/* Logout Confirmation Popup */}
    {showLogoutPopup && (
      <div className="overlay">
        <div className="popup-content">
          <h3>Are you sure you want to log out?</h3>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <button onClick={() => setShowLogoutPopup(false)} className="cancel-button">Cancel</button>
        </div>
      </div>
    )}
    </>
  );
};

export default Sidebar;
// mongodb://localhost:27017/mydb/University_Project