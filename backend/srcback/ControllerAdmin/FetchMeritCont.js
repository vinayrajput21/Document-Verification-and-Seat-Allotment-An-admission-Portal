const MeritList = require('../Models/AfterEntrance.model.js');

exports.getMeritlistByCourse = async (req, res) => {
  try {
    const { course } = req.body; // Extract course from request body
    console.log("Course : ", course);

    if (!course) {
      return res.status(400).json({ error: 'Course is required' });
    }

    // Query the MeritList collection for students belonging to the selected course
    const MeritListData = await MeritList.find({ course }).select('-_id -__v'); // Exclude _id and __v fields

    if (!MeritListData || MeritListData.length === 0) {
      return res.status(404).json({ error: `No merit list data found for course ${course}` });
    }

    // Respond with the fetched merit list data
    res.status(200).json({
      message: `Merit list for course ${course} fetched successfully`,
      MeritList: MeritListData,
    });
  } catch (error) {
    console.error('Error fetching merit list by course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
