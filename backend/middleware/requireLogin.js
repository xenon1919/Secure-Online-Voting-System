const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../config/keys");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.isAdmin) {
      req.user = { isAdmin: true };
      return next();
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
