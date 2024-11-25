import React, { useState } from 'react';
import axios from 'axios';
import '../../cssss/Student_css/Your_Profile.css';
import '../../cssss/Student_css/ChangePassword.css';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError("New passwords don't match.");
            return;
        }

        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated.');
                return;
            }

            // Make API request using Axios to change password
            const response = await axios.post('http://localhost:3001/api/changepass/change-password', 
                { currentPassword, newPassword }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Handle the response from the backend
            if (response.status === 200) {
                setMessage('Password successfully updated.');
                // Clear input fields after success
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                alert("Password successfully updated.")
            } else {
                setError(response.data.message || 'Failed to update password.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="dashboard-container change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Current Password:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Password</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
