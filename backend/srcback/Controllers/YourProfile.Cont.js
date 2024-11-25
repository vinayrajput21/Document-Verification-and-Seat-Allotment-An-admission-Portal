const Application = require('../Models/YourProfile.model.js'); // Adjust the path as needed
const RegisterUser = require('../Models/Register.model.js');
// Controller function for submitting application
const submitApplication = async (req, res) => {
  
  try {
    console.log('Request body:', req.body);
   
    const applicationId = req.body.applicationId; // Get applicationId from request body

    if (!applicationId) {
      return res.status(400).json({ message: 'Application ID is required' });
    }

    // Check if the applicationId exists in RegisterUser
    const registeredUser = await RegisterUser.findOne({ applicationId });
    if (!registeredUser) {
      return res.status(404).json({ message: 'No registered user found with this application ID' });
    }
    
    const basicDetails = req.body.basicDetails ? JSON.parse(req.body.basicDetails) : {};
    const addressDetails = req.body.addressDetails ? JSON.parse(req.body.addressDetails) : {};
    const educationalDetails = req.body.educationalDetails ? JSON.parse(req.body.educationalDetails) : {};
    

    // console.log('Basic Details:', basicDetails);
    // console.log('Address Details:', addressDetails);
    // console.log('Educational Details:', educationalDetails);

    // Construct upload details from files
    const uploadDetails = {
      photo: req.files['photo'] ? req.files['photo'][0].path : null,
      signature: req.files['signature'] ? req.files['signature'][0].path : null,
      xthMarksheet: req.files['xthMarksheet'] ? req.files['xthMarksheet'][0].path : null,
      xiithMarksheet: req.files['xiithMarksheet'] ? req.files['xiithMarksheet'][0].path : null,
      casteCertificate: req.files['casteCertificate'] ? req.files['casteCertificate'][0].path : null,
      domicileCertificate: req.files['domicileCertificate'] ? req.files['domicileCertificate'][0].path : null,
      incomeCertificate: req.files['incomeCertificate'] ? req.files['incomeCertificate'][0].path : null,
    };

    // Create application document
    const application = new Application({
      applicationId,
      basicDetails,
      addressDetails,
      educationalDetails,
      uploadDetails
    });

    // Save application to the database
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Error submitting application', error });
  }
};

module.exports = { submitApplication };
