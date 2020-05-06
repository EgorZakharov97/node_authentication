require('dotenv').config();

const express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path');

// APP
const app = express();

// REQUIRED FUNCTIONS
const logger = require('./middleware/logger');
const userStats = require('./middleware/userStats');

// ROUTES
const IndexRoutes = require('./routes');
const AnalyticsRoutes = require('./routes/Analytics');
const Authentication = require('./routes/Authentication');


//REDIS
require('./middleware/redisSetup')(app);

// DATABASE
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

// Other settings
app.set('public', path.join(__dirname, 'public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'build')));

app.use(userStats);

// USE ROUTES
app.use(IndexRoutes);
app.use(AnalyticsRoutes);
app.use(Authentication);

// Server
app.listen(process.env.PORT || 3000, () => {
	logger.info(`Worker ${process.pid} has started at port ${process.env.PORT}`)
});