const logger = require('./winston');

module.exports = {
  info(message) {
    logger.info(message);
  },
  error(err) {
      if (err instanceof Error) {
        logger.log({ level: 'error', message: `${err.stack || err}` });
      } else {
        logger.log({ level: 'error', message: err });
      }
  },
};
