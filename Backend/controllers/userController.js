const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();

    if (!users) {
      res.status(400);
      throw new Error("Error retrieving users or it may be empty");
    }

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400);
      throw new Error("Error creating user");
    }

    const { password: userPassword, ...restData } = newUser._doc;

    res.status(200).json({ ...restData });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log("Inside login controller");

    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    console.log(user);

    if (!user) {
      res.status(400);
      console.log("user not found");
      throw new Error("User not found for this emailId");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(400);
      console.log("Password not match");
      throw new Error("Email or Password is incorrect");
    }

    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("jwt", token);
      console.log("Generated Token:", token);
    } catch (error) {
      console.error("Error generating token:", error);
    }

    const { password: userPassword, ...restData } = user._doc;

    res.status(200).json({ ...restData });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("jwt", { httpOnly: true });

  return res.status(200).json({ msg: "Logged out successfully" });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
};
