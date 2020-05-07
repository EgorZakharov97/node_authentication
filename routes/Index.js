const express = require('express'),
	isAuthenticated = require('../middleware/authCheck').isAuthenticated,
	isAdmin = require('../middleware/authCheck').isAdmin,
	logger = require('../tools/logger');
let router = express.Router();

router.get('/', (req, res) => {
	if(req.isAuthenticated()){
		logger.error('Sample error');
		res.send('Hello, ' + req.user.displayName);
	} else {
		if(req.session.visits){
			req.session.visits++;
		} else {
			req.session.visits = 1;
		}
		res.json({msg: 'Hello, stranger', visits: req.session.visits})
	}
});

router.get('/secret', isAuthenticated, (req, res) => {
	res.send("This is a protected page for authorized users");
});

router.get('/admin', isAdmin, (req, res) => {
	res.send("This is a protected page for admin");
});

module.exports = router;