import React, { useState } from 'react';

export default function UploadDetails({ onFileChange }) {
    const [files, setFiles] = useState({
        photo: null,
        signature: null,
        xthMarksheet: null,
        xiithMarksheet: null,
        casteCertificate: null,
        domicileCertificate: null,
        incomeCertificate: null
    });

    // Handle file selection and notify parent component
    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;
        const selectedFile = fileList[0];  // Only take the first file

        setFiles((prevFiles) => ({
            ...prevFiles,
            [name]: selectedFile
        }));

        // Send the selected file back to the parent component
        onFileChange(name, selectedFile);
    };

    return (
        <div className="dashboard-container">
            <h2>Upload Required Documents</h2>
            <form>
                <div className="form-fields-left">
                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handleFileChange}
                        required
                    />

                    <label htmlFor="signature">Signature:</label>
                    <input
                        type="file"
                        id="signature"
                        name="signature"
                        onChange={handleFileChange}
                        required
                    />

                    <label htmlFor="xthMarksheet">10th Marksheet:</label>
                    <input
                        type="file"
                        id="xthMarksheet"
                        name="xthMarksheet"
                        onChange={handleFileChange}
                        required
                    />

                    <label htmlFor="xiithMarksheet">12th Marksheet:</label>
                    <input
                        type="file"
                        id="xiithMarksheet"
                        name="xiithMarksheet"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <div className="form-fields-right">
                    <label htmlFor="casteCertificate">Caste Certificate:</label>
                    <input
                        type="file"
                        id="casteCertificate"
                        name="casteCertificate"
                        onChange={handleFileChange}
                    />

                    <label htmlFor="domicileCertificate">Domicile Certificate:</label>
                    <input
                        type="file"
                        id="domicileCertificate"
                        name="domicileCertificate"
                        onChange={handleFileChange}
                    />

                    <label htmlFor="incomeCertificate">Income Certificate:</label>
                    <input
                        type="file"
                        id="incomeCertificate"
                        name="incomeCertificate"
                        onChange={handleFileChange}
                    />
                </div>
            </form>
        </div>
    );
}
