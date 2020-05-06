const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	firstName: String,
	lastName: String,
	dateBorn: Number,
	comingFrom: {
		type: String,
		default: 'Local'
	},
	infoComplete: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("User", UserSchema);