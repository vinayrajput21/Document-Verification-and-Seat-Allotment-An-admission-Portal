import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../../cssss/Home_css/Rightside.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    captcha: '',
    consent: false,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  // const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [error, setError] = useState(null); // State for error messages

  // Handle form input changes for registration
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
        ...loginData,
        [name]: value
    });
    setErrors({
        ...errors,
        [name]: '' // Clear individual field error when user types
    });
};

  // Submit Registration Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        localStorage.removeItem('isSubmitted');
        const response = await axios.post('http://localhost:3001/api/users/register', formData); 
        localStorage.setItem('applicationId', response.data.user.applicationId);
        localStorage.setItem('token', response.data.user.token);
    
        console.log('Registration successful:', response.data);
        navigate('/student'); // Redirect on success
        alert(" You are registered succesfully! \n Your password is send to your registered mail ")
      } catch (error) {
        console.error('Error during registration:', error);
        alert("User already registered with this email")
        // Handle error here, e.g. display error message
      }
    }
  };

  // Submit Login Form
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      try {
        const response = await axios.post('http://localhost:3001/api/Login/login', {
          email: loginData.email,
          password: loginData.password,
      },
      
      {
        headers: {
            'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;
      const isSubmitted=true;
      // Store the token and user info
      localStorage.setItem('token', token);

      localStorage.setItem('isSubmitted', isSubmitted); 
      

        alert('Login successful!'); // Show success message // Change URL based on your backend
        // console.log('Login successful:', response.data);
        navigate('/student'); // Redirect on success
      } catch (error) {
        if (error.response && error.response.data.error) {
          setError(error.response.data.error); // Set error message from API
          alert("Invalid password");
      } else {
          setError('Login failed. Please try again.'); // Generic error message
      }
      }
    }
  };

  // Validate Registration Form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      formErrors['name'] = 'Please enter your name';
    }

    if (!formData.email) {
      isValid = false;
      formErrors['email'] = 'Please enter your email address';
    }

    if (!formData.mobile) {
      isValid = false;
      formErrors['mobile'] = 'Please enter your mobile number';
    }

    if (!formData.captcha) {
      isValid = false;
      formErrors['captcha'] = 'Please enter the captcha';
    }

    setErrors(formErrors);
    return isValid;
  };

  // Validate Login Form
  const validateLoginForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!loginData.email) {
      isValid = false;
      formErrors['email'] = 'Please enter your email';
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
      <div className="toggle-buttons">
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>
          Register
        </button>
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
          Login
        </button>
      </div>

      {/* Render the registration form */}
      {!isLogin ? (
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Register</h2>
          <div>
            <label>Enter Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="error">{errors.name}</span>
          </div>

          <div>
            <label>Enter Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error">{errors.email}</span>
          </div>

          <div>
            <label>Enter Mobile Number *</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <span className="error">{errors.mobile}</span>
          </div>

          <div>
            <label>Captcha *</label>
            <input
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
            />
            <img src="captcha-placeholder.png" alt="captcha" />
            <span className="error">{errors.captcha}</span>
          </div>

          {/* <label>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />{' '}
            <small>I authorize Ymca Institute to contact me via Email, SMS, WhatsApp, and Call.</small>
          </label>
           */}

          <button type="submit">Submit</button>
        </form>
      ) : (
        // Render the login form
        <form onSubmit={handleLoginSubmit} className="login-form">
          <h2>Login</h2>
          <div>
                <label>Email *</label>
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
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
      )}
    </div>
  );
};

export default RegistrationForm;
