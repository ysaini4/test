const jwt = require("jsonwebtoken");
const config = require("config");

exports.auth = function(req, res, next) {
  checkAuth(req, res);
  next();
};
const checkAuth = (req, res) => {
  if (!config.get("requiresAuth")) return next();
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ status: false, msg: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (ex) {
    res.status(400).send({ status: false, msg: "Invalid token." });
  }
};
