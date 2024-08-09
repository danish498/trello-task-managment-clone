const jwt = require("jsonwebtoken");

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

exports.createToken = async (user) => {
  const expiresIn = 60 * 60 * 24 * 7;
  return await jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: expiresIn,
    }
  );
};
