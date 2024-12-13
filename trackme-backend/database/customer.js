const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

// Skema untuk Customer
const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Menggunakan plugin autoIncrement untuk mengatur customerID
customerSchema.plugin(autoIncrement, { inc_field: 'customerID' });

// Membuat model berdasarkan skema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
