require("dotenv").config();
const mongoose = require("mongoose");
const { mongo_db_change } = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_db_change);
  } catch (error) {
    console.error(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
