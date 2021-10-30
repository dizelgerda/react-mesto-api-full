require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.replace('Bearer ', '');
    req.user = jwt.verify(token, JWT_SECRET)._id;
    next();
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    next(err);
  }
};
