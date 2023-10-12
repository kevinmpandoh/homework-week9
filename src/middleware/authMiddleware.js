const { verifyToken } = require('../utils/auth');

const authMiddleware = (req, res, next) => {

  const beareHeader = req.headers['authorization'];

  const token = beareHeader.split(' ')[1];
  const data = verifyToken(token);

  if (data.role === 'Admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
