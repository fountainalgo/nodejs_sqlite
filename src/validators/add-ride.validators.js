const validator = require('../utils/response-formatter');

module.exports = {
  validateStartLatLong: (req, res, next) => {
    const value = validator.validateStartLatLong(req.body.start_lat, req.body.start_lat);
    if (value.err_msg) {
      return res.status(value.status).send(value.err_msg);
    }

    return next();
  },

  validateEndLatLong: (req, res, next) => {
    const value = validator.validateEndLatLong(req.body.end_lat, req.body.end_long);

    if (value.err_msg) {
      return res.status(value.status).send(value.err_msg);
    }

    return next();
  },
};
