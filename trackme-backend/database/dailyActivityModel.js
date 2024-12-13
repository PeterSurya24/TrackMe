const mongoose = require('mongoose');

// Schema untuk Daily Activity dengan enums
const dailyActivitySchema = new mongoose.Schema({
  transportationModels: {
    type: String,
    enum: ['public', 'walk', 'bike', 'car', 'motorcycle'],
    required: true,
  },
  energyUsage: {
    type: String,
    enum: ['electricity', 'solar', 'wind', 'hydropower'],
    required: true,
  },
  meals: {
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten_free', 'high_calorie'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const DailyActivity = mongoose.model('DailyActivity', dailyActivitySchema);

module.exports = DailyActivity;
