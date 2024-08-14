const multer = require("multer");
const path = require("path");
const Rooms = require("../models/roomModel");

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();

    if (!rooms) {
      res.status(400);
      throw new Error("No rooms to display");
    }

    res.status(200).json(rooms);
  } catch (err) {
    console.log("error");
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id);

    if (!room) {
      res.status(400);
      throw new Error("No room with this id found !!");
    }

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

const createNewRoom = async (req, res, next) => {
  try {
    console.log("Inside create room controller");
    const { roomtype, description, price, roomnumber } = req.body;
    console.log("file here ", req.file);
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "Image file is required" });
    }
    const image = req.file.filename;

    const newRoom = new Rooms({
      roomtype,
      description,
      price,
      roomnumber,
      image,
    });

    await newRoom.save();

    if (!newRoom) {
      console.log("Error creating room");
      res.status(400);
      throw new Error("Error creating room");
    }

    res.status(200).json({ msg: "Room created successfully" });
  } catch (err) {
    console.log("Error Inside create room controller");
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updateData = await Rooms.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateData) {
      res.status(400);
      throw new Error("Error updating details");
    }

    res.status(200).json({ msg: "Details updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const deleteData = await Rooms.findByIdAndDelete(req.params.id);

    if (!deleteData) {
      res.status(400);
      throw new Error("Error deleteing the room");
    }

    res.status(200).json({ msg: "Room deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRooms,
  getRoom,
  createNewRoom,
  updateRoom,
  deleteRoom,
};
