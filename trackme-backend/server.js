const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Tambahkan untuk verifikasi JWT

// Import controller
const customerControl = require('./controller/customerControl');
const dailyActivityControl = require('./controller/dailyActivityControl');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON body

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/TrackMe2');

// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Biasanya token dikirim di header Authorization

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Menyimpan decoded token di req.user
    next(); // Lanjut ke route berikutnya
  });
};

// Rute untuk registrasi
app.post('/register/customer', customerControl.registerCustomer);

// Rute untuk login
app.post('/login/customer', customerControl.loginCustomer);

// Rute untuk menyimpan daily activity dengan autentikasi
app.post('/daily-activity', dailyActivityControl.addDailyActivity);


// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
