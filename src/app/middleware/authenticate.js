const jwt = require('jsonwebtoken');

// Middleware autentikasi
module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Menambahkan data user ke request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
