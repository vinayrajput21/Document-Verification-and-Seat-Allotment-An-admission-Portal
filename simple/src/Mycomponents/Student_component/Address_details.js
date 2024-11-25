import React, { useState,useEffect } from 'react';

export default function AddressDetails({ onDataChange }) {

    const [formData, setFormData] = useState({
        permanentAddress: {
            state: '',
            city: '',
            address: '',
            district: '',
            pincode: ''
        },
        correspondenceAddress: {
            state: '',
            city: '',
            address: '',
            district: '',
            pincode: ''
        },
        sameAsPermanent: false
    });

    const [districts, setDistricts] = useState([]); // Array of districts based on selected state

    // Event handler for form input changes
    const handleChange = (e, addressType) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [addressType]: {
                ...prevData[addressType],
                [name]: value
            }
        }));
        // onDataChange(formData);
    };

    const handleStateChange = (e, addressType) => {
        const { value } = e.target;
        // Set the selected state and update districts based on state
        setFormData(prevData => ({
            ...prevData,
            [addressType]: {
                ...prevData[addressType],
                state: value,
                district: '' // Reset district on state change
            }
        }));
        // Update districts array based on selected state
        setDistricts(getDistrictsByState(value));
    };

    const handleCheckboxChange = () => {
        setFormData(prevData => ({
            ...prevData,
            sameAsPermanent: !prevData.sameAsPermanent,
            correspondenceAddress: prevData.sameAsPermanent
                ? {
                    state: '',
                    city: '',
                    address: '',
                    district: '',
                    pincode: ''
                  } // Unchecked: Clear data
                : { ...prevData.permanentAddress } // Checked: Copy permanent address data
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic here
        console.log('Form submitted:', formData);
    };

    // Function to fetch districts based on selected state
    const getDistrictsByState = (state) => {
        // Mock function; replace with actual data or API call
        if (state === "Andhra Pradesh") {
            return ["andhra a", "andhara b"];
        } else if (state === "Himachal Pradesh") {
            return ["hp", "hp2"];
        }
        return [];
    };
    const [debouncedFormData, setDebouncedFormData] = useState(formData);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedFormData(formData);
        }, 200); // Delay of 500ms (you can adjust this delay)

        // Cleanup timer on component unmount or when formData changes
        return () => {
            clearTimeout(timerId);
        };
    }, [formData]);

    // Only send the debounced form data to the parent
    useEffect(() => {
        console.log('Sending debounced data from address_Details to parent:', debouncedFormData);
        onDataChange(debouncedFormData);
    }, [debouncedFormData, onDataChange]);



    // Checkbox component
    // const Checkbox = ({ label, value, onChange }) => (
    //     <label>
    //         <input type="checkbox" checked={value} onChange={onChange} />
    //         {label}
    //     </label>
    // );

    return (
        <div className="dashboard-container">
            <h2>Address</h2>
            <h6>Permanent Address:</h6>
            <form onSubmit={handleSubmit}>
                <div className="form-fields-left">
                    <label htmlFor="state">State:</label>
                    <select
                        name="state"
                        value={formData.permanentAddress.state}
                        onChange={(e) => handleStateChange(e, 'permanentAddress')}
                        required
                    >
                        <option value="">Select State</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                    </select>

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.permanentAddress.city}
                        onChange={(e) => handleChange(e, 'permanentAddress')}
                    />
                    <label htmlFor="address">Address:</label>
                    <textarea
                        name="address"
                        rows="4"
                        cols="50"
                        style={{ resize: 'both', overflow: 'auto' }}
                        value={formData.permanentAddress.address}
                        onChange={(e) => handleChange(e, 'permanentAddress')}
                        placeholder="Enter your address here..."
                    />
                </div>
                <div className="form-fields-right">
                    <label htmlFor="district">District:</label>
                    <select
                        name="district"
                        value={formData.permanentAddress.district}
                        onChange={(e) => handleChange(e, 'permanentAddress')}
                        required
                        disabled={!formData.permanentAddress.state}
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.permanentAddress.pincode}
                        onChange={(e) => handleChange(e, 'permanentAddress')}
                    />
                </div>
            </form>

            <label>
                <input
                    type="checkbox"
                    checked={formData.sameAsPermanent}
                    onChange={handleCheckboxChange}
                />
            </label>
            <h8>if Correspondence Address is same as Permanent Address</h8>
         
            <h6>Correspondence Address:</h6>
            <form onSubmit={handleSubmit}>
                <div className="form-fields-left">
                    <label htmlFor="state">State:</label>
                    <select
                        name="state"
                        value={formData.correspondenceAddress.state}
                        onChange={(e) => handleStateChange(e, 'correspondenceAddress')}
                        required
                        disabled={formData.sameAsPermanent}
                    >
                        <option value="">Select State</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                    </select>

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.correspondenceAddress.city}
                        onChange={(e) => handleChange(e, 'correspondenceAddress')}
                        disabled={formData.sameAsPermanent}
                    />
                    <label htmlFor="address">Address:</label>
                    <textarea
                        name="address"
                        rows="4"
                        cols="50"
                        style={{ resize: 'both', overflow: 'auto' }}
                        value={formData.correspondenceAddress.address}
                        onChange={(e) => handleChange(e, 'correspondenceAddress')}
                        placeholder="Enter your address here..."
                        disabled={formData.sameAsPermanent}
                    />
                </div>
                <div className="form-fields-right">
                    <label htmlFor="district">District:</label>
                    <select
                        name="district"
                        value={formData.correspondenceAddress.district}
                        onChange={(e) => handleChange(e, 'correspondenceAddress')}
                        required
                        disabled={!formData.correspondenceAddress.state || formData.sameAsPermanent}
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.correspondenceAddress.pincode}
                        onChange={(e) => handleChange(e, 'correspondenceAddress')}
                        disabled={formData.sameAsPermanent}
                    />
                </div>
            </form>
        </div>
    );
}
