require("dotenv").config();
const mongoose = require('mongoose');
const translogSchema = require('../models/transLog.schema');

const connectDB = async () => {
	try {
			await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
	} catch (error) {
			console.error(error.message)
			//Exit process with failure
			process.exit(1);
	}
}

module.exports = connectDB;
