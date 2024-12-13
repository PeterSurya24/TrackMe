const DailyActivity = require('../database/dailyActivityModel');

// Fungsi untuk menambahkan daily activity
exports.addDailyActivity = async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Debug log

    const { transportationModels, energyUsage, meals, date } = req.body;

    const newActivity = new DailyActivity({
      transportationModels,
      energyUsage,
      meals,
      date,
    });

    const savedActivity = await newActivity.save();

    res.status(201).json({ message: 'Daily activity saved successfully', data: savedActivity });
  } catch (error) {
    console.error('Error saving daily activity:', error); // Error log
    res.status(500).json({ message: 'Failed to save daily activity', error });
  }
};
