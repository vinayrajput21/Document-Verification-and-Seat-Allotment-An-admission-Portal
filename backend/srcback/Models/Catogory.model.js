const mongoose = require('mongoose');

const EntranceSchema = new mongoose.Schema(
  {
    Mca: {
      HOGC: { type: Number, required: true },
      ROHC: { type: Number, required: true },
      TFW: { type: Number, required: true },
      EWS: { type: Number, required: true },
      KM: { type: Number, required: true },
      SC: { type: Number, required: true },
      SCdep: { type: Number, required: true },
      BCA:{ type: Number, required: true },
      BCB:{ type: Number, required: true },
      PH: { type: Number, required: true },
    },
    Btech: {
      HOGC: { type: Number, required: true },
      ROHC: { type: Number, required: true },
      TFW: { type: Number, required: true },
      EWS: { type: Number, required: true },
      KM: { type: Number, required: true },
      SC: { type: Number, required: true },
      SCdep: { type: Number, required: true },
      BCA:{ type: Number, required: true },
      BCB:{ type: Number, required: true },
      PH: { type: Number, required: true },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Correctly define the model
const Category = mongoose.model('Category', EntranceSchema);

module.exports = Category;
