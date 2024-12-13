const mongoose = require('mongoose');

// Skema untuk Dashboard
const dashboardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',  // Menghubungkan dengan model Customer
    required: true 
  },
  carbonFootprint: {
    type: Number,
    required: true
  },
  emissionsBreakdown: {
    transportation: { type: Number, required: true },
    energyConsumption: { type: Number, required: true },
    diet: { type: Number, required: true }
  }
});

// Membuat model berdasarkan skema
const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
