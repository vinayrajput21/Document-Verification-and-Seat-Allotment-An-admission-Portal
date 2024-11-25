import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../../cssss/Home_css/Rightside.css';

const LoginAsAdmin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    adminId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      try {
        const response = await axios.post('http://localhost:3001/api/LoginAdmin/loginAdmin', 
          {
            adminId: loginData.adminId,
            password: loginData.password,
        },);
        localStorage.setItem('adminToken',response.data.token);
        console.log('Login successful:', response.data);
        alert('Login Successful');
        // Redirect to admin dashboard if login is successful
        navigate('/admin');
      } catch (error) {
        console.error('Login error:', error.response.data);
        alert('Login Failed');
      }
    }
  };

  const validateLoginForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!loginData.adminId) {
      isValid = false;
      formErrors['adminId'] = 'Please enter your adminId';
    }

    if (!loginData.password) {
      isValid = false;
      formErrors['password'] = 'Please enter your password';
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLoginSubmit} className="login-form">
        <h2>Login as admin</h2>
       
        <div>
          <label>Admin Id *</label>
          <input
            type="text"
            name="adminId"
            value={loginData.adminId}
            onChange={handleLoginChange}
          />
          <span className="error">{errors.adminId}</span>
        </div>
        <div>
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginAsAdmin;
