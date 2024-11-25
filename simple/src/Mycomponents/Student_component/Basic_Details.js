import React,{useState,useEffect} from 'react'

export default function Basic_Details({ onDataChange }) {
    

    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        motherName: '',
        session:'',
        mobileNo: '',
        email: '',
        aadharNo:'',
        familyId:'',
        programType: '',
        programApplied: '',
        dob: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        religion: '',
        category: '',
        subCategory: '',
        caste: '',
        fatherOccupation: '',
        familyIncome: '',
        fatherContact: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
     useEffect(() => {
        // Send updated form data to parent component
        onDataChange(formData);
    }, [formData, onDataChange]);

  return (
    <>
     <div className="dashboard-container">
            <h2>Basic Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-fields-left">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="motherName">Mother's Name:</label>
                    <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="gender">Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="nationality">Nationality:</label>
                    <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Nationality</option>
                        <option value="indian">Indian</option>
                    </select>

                     <label htmlFor="maritalStatus">Marital Status:</label>
                    <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                    <label htmlFor="religion">Religion:</label>
                    <input
                        type="text"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="caste">Caste:</label>
                    <input
                        type="text"
                        id="caste"
                        name="caste"
                        value={formData.caste}
                        onChange={handleChange}
                    />
                    <label htmlFor="aadharNo">Aadhar No</label>
                    <input
                        type="text"
                        id="aadharNo"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleChange}
                    />
                     <label htmlFor="fatherContact">Father's mobileNo</label>
                    <input
                        type="text"
                        id="fatherContact"
                        name="fatherContact"
                        value={formData.fatherContact}
                        onChange={handleChange}
                    />
                     <label htmlFor="fatherOccupation">Father's Occupation</label>
                     <select
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Occupation</option>
                        <option value="GovtEmployee">Govt. Employee</option>
                        <option value="CorpEmployee">Corporate Employee</option>
                        <option value="Other">Other</option>
                    </select>
                    <label htmlFor="programApplied">Program Applied:</label>
                    <select
                        name="programApplied"
                        value={formData.programApplied}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Options</option>
                        <option value="Btech">Btech</option>
                        <option value="Mca">Mca</option>
                    </select>

                    </div>
                    <div className="form-fields-right">
                    <label htmlFor="fatherName">Father's Name:</label>
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                    />
                     <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="mobileNo">Mobile No:</label>
                    <input
                        type="text"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="session">Session:</label>
                    <select
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Starting Session</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        
                    </select>
                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="HOGC">HOGC</option>
                        <option value="ROHC">ROHC</option>
                        <option value="TFW">TFW</option>
                        <option value="SC">SC</option>
                        <option value="EWS">EWS</option>
                    </select>

                    <label htmlFor="subCategory">Sub-Category:</label>
                    <input
                        type="text"
                        id="subCategory"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                    />
                    <label htmlFor="familyId">Family Id:</label>
                    <input
                        type="text"
                        id="familyId"
                        name="familyId"
                        value={formData.familyId}
                        onChange={handleChange}
                    />
                    <label htmlFor="familyIncome">Family Income:</label>
                    <select
                        name="familyIncome"
                        value={formData.familyIncome}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Income</option>
                        <option value="Below-1lakh<">Below - 1lakh</option>
                        <option value="1lakh - 2lakh">1lakh - 2lakh</option>
                        <option value="2lakh - 5lakh">2lakh - 5lakh</option>
                        <option value="5lakh - 8lakh">5lakh - 8lakh</option>
                        <option value="Above - 8lakh">Above - 8lakh</option>
                    </select>
                    <label htmlFor="programType">Program Type:</label>
                    <select
                        name="programType"
                        value={formData.programType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Option</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                    </select>
                   
                    
                </div>
            </form>
        </div>
    </>
  )
}
