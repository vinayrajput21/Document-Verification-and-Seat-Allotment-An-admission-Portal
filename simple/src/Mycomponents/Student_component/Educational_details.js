import React, { useState,useEffect} from 'react';

export default function EducationalDetails({ onDataChange }) {
    const [formData, setFormData] = useState({
        xboard: '',
        xsubject: '',
        xpassingYear: '',
        xrollNo: '',
        xpercen: '',
        xIIboard: '',
        xIIsubject: '',
        xIIpassingYear: '',
        xIIrollNo: '',
        xIIpercen: '',
        University: '',
        uniSubject: '',
        uniPassingYear: '',
        uniRollNo: '',
        uniPercen: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // onDataChange(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic here
        console.log('Educational Details submitted:', formData);
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
        console.log('Sending debounced data from educational_Details to parent:', debouncedFormData);
        onDataChange(debouncedFormData);
    }, [debouncedFormData, onDataChange]);


    return (
        <div className="dashboard-container">
            <h2> Qualification Details</h2>
            <h6>Secondary :</h6>
            <form onSubmit={handleSubmit}>
            <div className="form-fields-left">
            <label htmlFor="xboard">Board:</label>
            <select
                        name="xboard"
                        value={formData.xboard}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Board</option>
                        <option value="Hbse">Board of School Education Haryana</option>
                        <option value="Cbse">Central Board of School Education</option>
                    </select>
                    <label htmlFor="xsubject">Subject</label>
                    <input
                        type="text"
                        id="xsubject"
                        name="xsubject"
                        value={formData.xsubject}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="xpassingYear">Passing Year:</label>
                <input
                        type="text"
                        id="xpassingYear"
                        name="xpassingYear"
                        value={formData.xpassingYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-fields-right">
                <label htmlFor="xrollNo">Roll No:</label>
                <input
                        type="text"
                        id="xrollNo"
                        name="xrollNo"
                        value={formData.xrollNo}
                        onChange={handleChange}
                        required
                    />
                
                <label htmlFor="xpercen">Percentage\CGPA:</label>
                <input
                        type="text"
                        id="xpercen"
                        name="xpercen"
                        value={formData.xpercen}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
            <h6>Senior Secondary:</h6>
            <form onSubmit={handleSubmit}>
            <div className="form-fields-left">
            <label htmlFor="xIIboard">Board:</label>
            <select
                        name="xIIboard"
                        value={formData.xIIboard}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Board</option>
                        <option value="Hbse">Board of School Education Haryana</option>
                        <option value="Cbse">Central Board of School Education</option>
                    </select>
                    <label htmlFor="xIIsubject">Subject</label>
                    <input
                        type="text"
                        id="xIIsubject"
                        name="xIIsubject"
                        value={formData.xIIsubject}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="xIIpassingYear">Passing Year:</label>
                <input
                        type="text"
                        id="xIIpassingYear"
                        name="xIIpassingYear"
                        value={formData.xIIpassingYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-fields-right">
                <label htmlFor="xIIrollNo">Roll No:</label>
                <input
                        type="text"
                        id="xIIrollNo"
                        name="xIIrollNo"
                        value={formData.xIIrollNo}
                        onChange={handleChange}
                        required
                    />
                
                <label htmlFor="xIIpercen">Percentage\CGPA:</label>
                <input
                        type="text"
                        id="xIIpercen"
                        name="xIIpercen"
                        value={formData.xIIpercen}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
            <h6>Graduation: <small>(if applicable)</small></h6>
            <form onSubmit={handleSubmit}>
            <div className="form-fields-left">
            <label htmlFor="University">University/Institute:</label>
            <select
                        name="University"
                        value={formData.University}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Board</option>
                        <option value="Mdu">Maharishi Dayanand University,Rohtak</option>
                        <option value="Ymca">J.C.Bose University of Science and Technology</option>
                    </select>
                    <label htmlFor="uniSubject">Subject</label>
                    <input
                        type="text"
                        id="uniSubject"
                        name="uniSubject"
                        value={formData.uniSubject}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="uniPassingYear">Passing Year:</label>
                <input
                        type="text"
                        id="uniPassingYear"
                        name="uniPassingYear"
                        value={formData.uniPassingYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-fields-right">
                <label htmlFor="uniRollNo">Roll No:</label>
                <input
                        type="text"
                        id="uniRollNo"
                        name="uniRollNo"
                        value={formData.uniRollNo}
                        onChange={handleChange}
                        required
                    />
                
                <label htmlFor="uniPercen">Percentage\CGPA:</label>
                <input
                        type="text"
                        id="uniPercen"
                        name="uniPercen"
                        value={formData.uniPercen}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
           
        </div>
    );
}
