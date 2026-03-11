const jwt = require('jsonwebtoken');
const User = require('../models/User');

// BUG 2: No try/catch around jwt.verify — an invalid or malformed token
// will throw a synchronous error that is not caught here, causing the server
// to crash or return an unhandled error instead of a clean 401 response.
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
