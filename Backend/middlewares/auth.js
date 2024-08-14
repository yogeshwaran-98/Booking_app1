const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    console.log("Inside auth");
    const token = req.cookies.jwt;

    if (!token) {
      console.log("Token not ok");
      return res.status(400).json({ msg: "Unauthorized" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(data.id);

    if (!user) {
      console.log("user not found");
      return res.status(400).json({ message: "not authorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    console.log("inside auth error");
    return res.status(400).json({ message: "no token" });
  }
};

module.exports = auth;
