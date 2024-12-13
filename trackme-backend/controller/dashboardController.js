const Customer = require('../database/models/customer');
const Activity = require('../database/models/activity');  // Asumsi Anda sudah memiliki model aktivitas

// Endpoint untuk mendapatkan data profil pengguna dan aktivitas terbaru
const getDashboardData = async (req, res) => {
  try {
    const customerID = req.user.customerID; // Ambil ID dari token yang telah divalidasi

    // Cari customer berdasarkan customerID
    const customer = await Customer.findById(customerID);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    // Cari aktivitas terbaru berdasarkan customerID
    const activity = await Activity.findOne({ customerID }).sort({ createdAt: -1 });

    if (!activity) {
      return res.status(200).json({ 
        message: 'Please update your activity to calculate your carbon footprint.', 
        requiresUpdate: true 
      });
    }

    // Jika ada data aktivitas
    return res.status(200).json({
      message: 'Dashboard data retrieved successfully.',
      customer: customer,
      activity: activity,
      requiresUpdate: false
    });

  } catch (error) {
    console.error('Error retrieving dashboard data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getDashboardData
};
