const Category = require('../Models/Catogory.model.js'); // Adjust the path to your Category model

// Get category data based on course
exports.getCategoryByCourse = async (req, res) => {
  try {
    const { course } = req.body; // Extract course from request body

    if (!course) {
      return res.status(400).json({ error: 'Course is required' });
    }

    // Dynamically fetch the category field based on the course
    const categoryData = await Category.findOne({}, { [course]: 1, _id: 0 });

    if (!categoryData || !categoryData[course]) {
      return res.status(404).json({ error: 'Category data not found for the selected course' });
    }

    // Respond with the category data for the specified course
    res.status(200).json({
      message: `Category data for ${course} fetched successfully`,
      category: categoryData[course],
    });
  } catch (error) {
    console.error('Error fetching category data by course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
