const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomtype: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomnumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
