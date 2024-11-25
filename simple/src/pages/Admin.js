
import React, { useState } from 'react';
// import '../cssss/Student_css/Student.css';
// import '../cssss/Student_css/Dashboard.css';

// import Navbar_stu from '../Mycomponents/Student_component/Navbar_stu';
import Sidebar from '../Mycomponents/Admin_component/Sidebar_admin';
import Student_registered from '../Mycomponents/Admin_component/Student_registered';
import Entrance from '../Mycomponents/Admin_component/Entrance';
import Seat_alloted from '../Mycomponents/Admin_component/Seat_alloted';
import Change_password from '../Mycomponents/Admin_component/Change_password';

function Student() {
  const [activeComponent, setActiveComponent] = useState('profile'); // State to manage active component

  // Function to render components dynamically
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Student_registered':
        return <Student_registered />;
      case 'Entrance':
        return <Entrance />;
      case 'Seat_alloted':
        return <Seat_alloted />;
      case 'password':
        return <Change_password />;
      default:
        return <Student_registered />; // Default to profile if no match
    }
  };

  return (
    <>
    {/* <Navbar_stu/> */}
    <div className="App">
      {/* Pass setActiveComponent to Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <div className="main-content">
        {renderComponent()} {/* Render the active component */}
      </div>
    </div>
    </>
  );
}

export default Student;

