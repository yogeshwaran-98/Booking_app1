const Booking = require("../models/bookingModel");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("roomId");
    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingsByUser = async (req, res, next) => {
  try {
    console.log("inside bookings by user now");
    const { email } = req.body;
    const bookings = await Booking.find({ email });

    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }

    console.log(bookings);

    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

const getBookedDates = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const bookings = await Booking.find({ roomId });
    const bookedDates = bookings.map(({ checkInDate, checkOutDate }) => ({
      checkInDate,
      checkOutDate,
    }));

    res.json(bookedDates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked dates" });
  }
};

const createBooking = async (req, res, next) => {
  try {
    console.log("Inside create booking controller");
    const booking = await Booking.create(req.body);
    if (!booking) {
      console.log("Booking not created");
      res.status(400);
      throw new Error("cannot create booking");
    }
    console.log(booking);
    return res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedBooking) {
      res.status(400);
      throw new Error("cannot create booking");
    }
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    console.log("Inside delete booking controller");
    const room = await Booking.findByIdAndDelete(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("cannot delete room");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking) {
      res.status(400);
      throw new Error("booking not found");
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getBookingsByUser,
  getBookedDates,
};
