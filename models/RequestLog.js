const mongoose = require('mongoose');

const RequestLogSchema = new mongoose.Schema({
	url: String,
	method: String,
	responseTime: Number,
	day: String,
	hour: Number
});

module.exports = mongoose.model("RequestLog", RequestLogSchema);