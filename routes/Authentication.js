const express = require('express');
let router = express.Router();
const authenticateUser = require('../middleware/userAuthentication').authenticateUser;

router.get('/auth/google', (req, res) => {
	const userUrl = require('../middleware/authGoogle').getUserUrl();
	res.redirect(userUrl);
});

router.get('/auth/google/callback', (req, res) => {
	const promise = require('../middleware/authGoogle').getUserFromCode(req.query.code);
	promise.then(user => {

	})
});

module.exports = router;