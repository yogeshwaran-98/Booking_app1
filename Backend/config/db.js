const mongoose = require("mongoose");

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connection;
