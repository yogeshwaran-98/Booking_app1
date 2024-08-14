const { Router } = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByUser,
  getBookedDates,
} = require("../controllers/bookingController");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/", auth, getBookings);
router.get("/:id", getBooking);
router.get("/bookedDates/:roomId", getBookedDates);
router.post("/mybookings", getBookingsByUser);
router.post("/create", auth, createBooking);
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
