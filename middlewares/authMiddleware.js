const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'autogemz_secret_2024';

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = (auth && auth.startsWith('Bearer ') ? auth.split(' ')[1] : null) || req.query.token;
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated. Please login.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId    = decoded.id;
    req.userRole  = decoded.role;
    req.userEmail = decoded.email;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
  }
};

// Admin-only middleware
exports.adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
  next();
};
