const { Router } = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const auth = require("../middlewares/auth");
const router = Router();

router.get("/", auth, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
