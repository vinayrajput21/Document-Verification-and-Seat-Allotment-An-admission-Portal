const mongoose = require('mongoose');
const Category = require('../Models/Catogory.model.js'); // Adjust the path to your Category model

const createCategoryData = async () => {
  try {
    // Define the category data
    const categoryData = {
      Mca: {
        HOGC: 26,
        ROHC: 9,
        TFW: 3,
        EWS: 3,
        KM: 3,
        SC: 3,
        SCdep: 2,
        BCA:4,
        BCB:2,
        PH: 1,
      },
      Btech: {
        HOGC: 26,
        ROHC: 9,
        TFW: 3,
        EWS: 3,
        KM: 3,
        SC: 3,
        SCdep: 2,
        BCA:4,
        BCB:2,
        PH: 1,
      },
      //here you can add other courses similarly
    };

    // Connect to MongoDB
    mongoose
      .connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('Could not connect to MongoDB:', err));

    // Check if the category already exists (optional)
    const existingCategory = await Category.findOne({});
    if (existingCategory) {
      console.log('Category data already exists');
      mongoose.connection.close();
      return;
    }

    // Create a new category document
    const newCategory = new Category(categoryData);

    // Save the category to the database
    await newCategory.save();

    console.log('Category data created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating category data:', error);
    mongoose.connection.close();
  }
};

createCategoryData();
