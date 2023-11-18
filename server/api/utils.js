const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').slice(7);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided' });
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticateToken;