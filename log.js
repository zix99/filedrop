const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  level: config.verbose ? 'debug' : 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
