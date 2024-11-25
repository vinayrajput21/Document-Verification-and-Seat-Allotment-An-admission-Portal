import React, { useState } from 'react';
import axios from 'axios';
import '../../cssss/Student_css/Your_Profile.css';
import '../../cssss/Student_css/ChangePassword.css';

export default function AdminChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New passwords don't match.");
            return;
        }

        try {
            // Retrieve token from local storage (or other storage) if using token authentication
            const token = localStorage.getItem('adminToken');

            // Send the request to change password
            const response = await axios.post(
                'http://localhost:3001/api/changepassAdmin/change-password-admin',
                { currentPassword, newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token in headers
                    }
                }
            );

            if (response.status === 200) {
                setMessage('Admin password successfully updated.');
            } else {
                setMessage(response.data.message || 'Failed to update password.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="dashboard-container change-password-container">
            <h2>Admin Change Password</h2>
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
            {message && <p>{message}</p>}
        </div>
    );
}
