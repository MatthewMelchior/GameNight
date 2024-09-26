// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
      return next(); // User is authenticated
  }
  res.status(401).json({ message: 'Unauthorized' });
};

module.exports = isAuthenticated;