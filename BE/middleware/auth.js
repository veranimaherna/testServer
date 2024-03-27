const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied! Token is missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid Token." });
    }

    req.user = user;
    next();
  });
};

const authenticationTokenAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (user.level != "admin") {
      return res.status(401).json({ message: "Access denied. Admin Resource" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticationToken,
  authenticationTokenAdmin,
};
