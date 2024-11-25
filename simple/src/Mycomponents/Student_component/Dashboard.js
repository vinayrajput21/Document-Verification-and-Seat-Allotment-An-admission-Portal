import React from 'react';
import '../../cssss/Student_css/Dashboard.css';
import Your_Profile from './Your_Profile';
import Your_application_form from './Your_application_form';
import Fee_payment from './Fee_payment';
import Change_password from './Change_password';
const Dashboard = () => {
  return (
    <>
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>

    <Your_Profile/>
    <Your_application_form/>
    <Fee_payment/>
    <Change_password/>


    </>
  );
};

export default Dashboard;
