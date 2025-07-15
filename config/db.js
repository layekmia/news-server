const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
  });
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
