import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../cssss/Student_css/Your_Profile.css';
import Basic_Details from './Basic_Details';
import Address_details from './Address_details';
import Educational_details from './Educational_details';
import Upload_details from './Upload_details';

export default function ApplicationForm() {
    // State to collect all data from child components
    const [formData, setFormData] = useState({
        basicDetails: {},
        addressDetails: {},
        educationalDetails: {},
        uploadDetails: {}
    });

    // State to manage file uploads
    const [files, setFiles] = useState({
        photo: null,
        signature: null,
        xthMarksheet: null,
        xiithMarksheet: null,
        casteCertificate: null,
        domicileCertificate: null,
        incomeCertificate: null
    });

    // State to track profile and submission status
    const [profileData, setProfileData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Function to handle form data update from child components
    const updateFormData = (section, data) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: data
        }));
    };

    // Function to handle file uploads
    const handleFileChange = (name, file) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [name]: file
        }));
    };
    
    
    useEffect(() => {
        const submitted = localStorage.getItem('isSubmitted') === 'true';
        setIsSubmitted(submitted);
      }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare form data for Axios request
        const data = new FormData();
        const applicationId = localStorage.getItem('applicationId');
        console.log("Application ID:", applicationId);


        if (!applicationId) {
            console.error('Application ID is missing');

            return; // Prevent submission if ID is not found
        }
    
        // Append applicationId to FormData
        data.append('applicationId', applicationId);
        data.append('basicDetails', JSON.stringify(formData.basicDetails));
        data.append('addressDetails', JSON.stringify(formData.addressDetails));
        data.append('educationalDetails', JSON.stringify(formData.educationalDetails));

        // Append files to the FormData object
        for (const [key, file] of Object.entries(files)) {
            if (file) {
                data.append(key, file);
            }
        }

        try {
            // Make an Axios POST request to the backend
            const response = await axios.post('http://localhost:3001/api/YourProfile/apply', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle successful response
            console.log('Application submitted successfully:', response.data);
            
            // Set the submission status to true
            setIsSubmitted(true);
            localStorage.setItem('isSubmitted', 'true');
        } catch (error) {
            // Handle error response
            alert('please! fill form correctly')
            console.error('Error submitting application:', error);
        }
    };

    return (
        <div>
            {/* If form is not submitted, show the form */}
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <Basic_Details onDataChange={(data) => updateFormData('basicDetails', data)} />
                    <Address_details onDataChange={(data) => updateFormData('addressDetails', data)} />
                    <Educational_details onDataChange={(data) => updateFormData('educationalDetails', data)} />
                    <Upload_details onFileChange={handleFileChange} />
                    <button type='submit' style={{ marginLeft: '22px' }}>Submit All Details</button>
                </form>
            ) : (
                // If form is submitted, show the success message
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Your application has been submitted successfully!</h2>
                    {/* Optionally display profile data if needed */}
                    {/* {profileData && (
                        <div>
                            <h3>Your Profile Data:</h3>
                            <pre>{JSON.stringify(profileData, null, 2)}</pre>
                        </div>
                    )} */}
                </div>
            )}
        </div>
    );
}
