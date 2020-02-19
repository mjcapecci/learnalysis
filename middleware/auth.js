const jwt = require('jsonwebtoken');

const invalidMessage = 'Token is invalid';

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: invalidMessage });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user.id;

    next();
  } catch (err) {
    res.status(401).json({ msg: invalidMessage });
  }
};
