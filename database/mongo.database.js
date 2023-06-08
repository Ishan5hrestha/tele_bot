require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
			await mongoose.connect("mongodb+srv://parewa:MRLCkZm8M7xYbDEV@cluster0.so66ro2.mongodb.net/db_telebot")
	} catch (error) {
			console.error(error.message)
			//Exit process with failure
			process.exit(1);
	}
}

module.exports = connectDB;
