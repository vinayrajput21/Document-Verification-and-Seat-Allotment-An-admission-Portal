// controllers/pdfController.js
const UserProfile = require('../Models/YourProfile.model'); // Adjust path according to your structure
const Register = require('../Models/Register.model'); // Adjust path according to your structure
const PDFDocument = require('pdfkit');
const fs = require('fs'); // File system module to read files
const path = require('path'); // To handle file paths

exports.generatePDF = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is extracted from JWT token in middleware
    console.log('User ID:', userId);//this user id is fo register database

    const registerData = await Register.findById(userId); // Fetch user profile data from DB
    if (!registerData) {
      return res.status(404).send('Register data not found');
    }

    const profileData = await UserProfile.findOne({ applicationId: registerData.applicationId }); // Fetch user profile data from DB
   

    if (!profileData) {
      return res.status(404).send('Profile not found');
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-disposition', 'attachment; filename=profile.pdf');
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);

    // Title
    doc.fontSize(25).text('Profile Data', { align: 'center' });
    doc.moveDown();

    // Basic Details Section
    doc.fontSize(20).text('Basic Details', { underline: true });
    doc.moveDown();
    doc.fontSize(12)
       .text(`Name: ${profileData.basicDetails.name || 'N/A'}`)
       .text(`Father's Name: ${profileData.basicDetails.fatherName || 'N/A'}`)
       .text(`Mother's Name: ${profileData.basicDetails.motherName || 'N/A'}`)
       .text(`Mobile No: ${profileData.basicDetails.mobileNo || 'N/A'}`)
       .text(`Email: ${profileData.basicDetails.email || 'N/A'}`)
       .text(`Date of Birth: ${profileData.basicDetails.dob ? new Date(profileData.basicDetails.dob).toLocaleDateString() : 'N/A'}`)
       .text(`Nationality: ${profileData.basicDetails.nationality || 'N/A'}`)
       .text(`Gender: ${profileData.basicDetails.gender || 'N/A'}`)
       .text(`Marital Status: ${profileData.basicDetails.maritalStatus || 'N/A'}`)
       .text(`Religion: ${profileData.basicDetails.religion || 'N/A'}`)
       .text(`Category: ${profileData.basicDetails.category || 'N/A'}`)
       .text(`Caste: ${profileData.basicDetails.caste || 'N/A'}`)
       .text(`Father's Occupation: ${profileData.basicDetails.fatherOccupation || 'N/A'}`)
       .text(`Family Income: ${profileData.basicDetails.familyIncome || 'N/A'}`)
       .text(`Father's Contact: ${profileData.basicDetails.fatherContact || 'N/A'}`);
    doc.moveDown();

    // Address Details Section
    doc.fontSize(20).text('Address Details', { underline: true });
    doc.moveDown();
    const permanentAddress = profileData.addressDetails.permanentAddress || {};
    doc.fontSize(12)
       .text(`Permanent Address: ${permanentAddress.address || 'N/A'}, ${permanentAddress.city || 'N/A'}, ${permanentAddress.state || 'N/A'}, Pincode: ${permanentAddress.pincode || 'N/A'}`)
       .text(`Correspondence Address: ${profileData.addressDetails.correspondenceAddress ? `${profileData.addressDetails.correspondenceAddress.address || 'N/A'}, ${profileData.addressDetails.correspondenceAddress.city || 'N/A'}, ${profileData.addressDetails.correspondenceAddress.state || 'N/A'}` : 'N/A'}`);
    doc.moveDown();

    // Educational Details Section
    doc.fontSize(20).text('Educational Details', { underline: true });
    doc.moveDown();
    const eduDetails = profileData.educationalDetails || {};
    doc.fontSize(12)
       .text(`10th Board: ${eduDetails.xboard || 'N/A'}`)
       .text(`10th Subjects: ${eduDetails.xsubject || 'N/A'}`)
       .text(`10th Passing Year: ${eduDetails.xpassingYear || 'N/A'}`)
       .text(`10th Roll No: ${eduDetails.xrollNo || 'N/A'}`)
       .text(`10th Percentage: ${eduDetails.xpercen || 'N/A'}`)
       .text(`12th Board: ${eduDetails.xIIboard || 'N/A'}`)
       .text(`12th Subjects: ${eduDetails.xIIsubject || 'N/A'}`)
       .text(`12th Passing Year: ${eduDetails.xIIpassingYear || 'N/A'}`)
       .text(`12th Roll No: ${eduDetails.xIIrollNo || 'N/A'}`)
       .text(`12th Percentage: ${eduDetails.xIIpercen || 'N/A'}`)
       .text(`University: ${eduDetails.University || 'N/A'}`)
       .text(`University Subjects: ${eduDetails.uniSubject || 'N/A'}`)
       .text(`University Passing Year: ${eduDetails.uniPassingYear || 'N/A'}`)
       .text(`University Roll No: ${eduDetails.uniRollNo || 'N/A'}`)
       .text(`University Percentage: ${eduDetails.uniPercen || 'N/A'}`);
    doc.moveDown();

    // Upload Details Section
    doc.fontSize(20).text('Upload Details', { underline: true });
    doc.moveDown();
    const uploadDetails = profileData.uploadDetails || {};
    
    // Include Photo
    if (uploadDetails.photo) {
      const photoPath = path.join(__dirname, '..', uploadDetails.photo); // Adjust path to read the image file
      if (fs.existsSync(photoPath)) {
        doc.image(photoPath, { fit: [100, 100], align: 'center' }); // Adjust the size as needed
        doc.moveDown();
      } else {
        doc.text('Photo: File not found');
      }
    }
    
    // Include Signature
    if (uploadDetails.signature) {
      const signaturePath = path.join(__dirname, '..', uploadDetails.signature);
      if (fs.existsSync(signaturePath)) {
        doc.image(signaturePath, { fit: [100, 50], align: 'center' }); // Adjust the size as needed
        doc.moveDown();
      } else {
        doc.text('Signature: File not found');
      }
    }
    
    // Document links
    doc.fontSize(12);
    doc.text(`10th Marksheet: ${uploadDetails.xthMarksheet ? `Available` : 'Not Provided'}`);
    doc.text(`12th Marksheet: ${uploadDetails.xiithMarksheet ? `Available` : 'Not Provided'}`);
    doc.text(`Caste Certificate: ${uploadDetails.casteCertificate ? `Available` : 'Not Provided'}`);
    doc.text(`Domicile Certificate: ${uploadDetails.domicileCertificate ? `Available` : 'Not Provided'}`);
    doc.text(`Income Certificate: ${uploadDetails.incomeCertificate ? `Available` : 'Not Provided'}`);

    // Finalize the PDF and end the stream
    console.log('Finalizing the PDF document...');
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
};
