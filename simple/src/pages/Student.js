import React, { useState } from 'react';
import '../cssss/Student_css/Student.css';
// import '../cssss/Student_css/Dashboard.css';

// import Navbar_stu from '../Mycomponents/Student_component/Navbar_stu';
import Sidebar from '../Mycomponents/Student_component/Sidebar';
import Your_Profile from '../Mycomponents/Student_component/Your_Profile';
import Your_application_form from '../Mycomponents/Student_component/Your_application_form';
import Fee_payment from '../Mycomponents/Student_component/Fee_payment';
import Change_password from '../Mycomponents/Student_component/Change_password';

function Student() {
  const [activeComponent, setActiveComponent] = useState('profile'); // State to manage active component

  // Function to render components dynamically
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Your_Profile />;
      case 'application':
        return <Your_application_form/>;
      case 'payment':
        return <Fee_payment />;
      case 'password':
        return <Change_password />;
      default:
        return <Your_Profile />; // Default to profile if no match
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
