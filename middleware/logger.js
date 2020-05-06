const winston = require('winston');

// LOGGER
const logger = winston.createLogger({
	level: "silly",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.simple()
	),
	transports: [
		new winston.transports.File({filename: "info.log", level: "silly"}),
		new winston.transports.File({filename: "error.log", level: "error"})
	]
});
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	}));
}

module.exports = logger;