const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	if(!req.session.visits){
		req.session.visits = 1;
	} else {
		req.session.visits++;
	}
	console.log('Main page requested by port ' + process.pid);
	const message = {
		visit: 'Main page',
		pid: process.pid,
		numVisits: req.session.visits
	};
	res.json(message)
});

module.exports = router;