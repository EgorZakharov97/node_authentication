const User = require('../models/User');
const logger = require('./logger');

function authenticateUser(user){
	User.findOne({email: user.email}, (err, user) => {
		if (err) {
			logger.error(err)
		} else {
			if(user){
				console.log('this is user')
			} else {
				let newUser = {

				}
			}
		}
	})
}

module.exports = {
	authenticateUser: authenticateUser
};