const jwt = require('jsonwebtoken');

const signToken = (data) => {

  const token = jwt.sign(data, "sangatrahasia", { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, "sangatrahasia");
  return data;
};

module.exports = { signToken, verifyToken };
