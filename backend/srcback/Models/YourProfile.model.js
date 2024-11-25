const mongoose = require('mongoose');

// Define the main Application schema directly
const ApplicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true, // Ensures each profile has a unique applicationId
  },
  // Basic Details fields directly defined in the main schema
  basicDetails: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    session: { type: String, required: true },
    mobileNo: { type: String, required: true, match: /^[0-9]{10}$/ },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    aadharNo: { type: String, required: true, match: /^[0-9]{12}$/ },
    familyId: { type: String },
    programType: { type: String, required: true },
    programApplied: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    religion: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    caste: { type: String },
    fatherOccupation: { type: String, required: true },
    familyIncome: { type: String, required: true},
    fatherContact: { type: String, match: /^[0-9]{10}$/ },
  },
  
  // Address Details (embedded)
  addressDetails: {
    permanentAddress: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      district: { type: String, required: true },
      pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
    },
    correspondenceAddress: {
      state: {
        type: String,
        required: function () { return !this.sameAsPermanent; },
      },
      city: {
        type: String,
        required: function () { return !this.sameAsPermanent; },
      },
      address: {
        type: String,
        required: function () { return !this.sameAsPermanent; },
      },
      district: {
        type: String,
        required: function () { return !this.sameAsPermanent; },
      },
      pincode: {
        type: String,
        required: function () { return !this.sameAsPermanent; },
        match: /^[0-9]{6}$/,
      },
    },
    sameAsPermanent: {
      type: Boolean,
      default: false,
    },
  },

  // Educational Details (embedded directly)
  educationalDetails: {
      xboard: { type: String, required: true },
      xsubject: { type: String, required: true },
      xpassingYear: { type: String, required: true },
      xrollNo: { type: String, required: true },
      xpercen: { type: String, required: true },
  

      xIIboard: { type: String, required: true },
      xIIsubject: { type: String, required: true },
      xIIpassingYear: { type: String, required: true },
      xIIrollNo: { type: String, required: true },
      xIIpercen: { type: String, required: true },
    
  
      University: { type: String, required: false }, // Graduation may not be required for all
      uniSubject: {
        type: String,
        required: function() {
          return !!this.University;
        }
      },
      uniPassingYear: {
        type: String,
        required: function() {
          return !!this.University;
        }
      },
      uniRollNo: {
        type: String,
        required: function() {
          return !!this.University;
        }
      },
      uniPercen: {
        type: String,
        required: function() {
          return !!this.University;
        }
      }
    
  },
  
  // Upload Details fields directly defined
  uploadDetails: {
    photo: { type: String },
    signature: { type: String },
    xthMarksheet: { type: String },
    xiithMarksheet: { type: String },
    casteCertificate: { type: String },
    domicileCertificate: { type: String },
    incomeCertificate: { type: String },
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the Application model
const YourProfile = mongoose.model('YourProfile', ApplicationSchema);
module.exports = YourProfile;
