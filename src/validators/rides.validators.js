const validators = require('../utils/response-formatter');

module.exports = {
  validateQueryParamPage: (req, res, next) => {
    const value = validators.validateQueryParamPage(req.query.page);

    if (value.error_code) {
      return res.status(400).send(value);
    }

    return next();
  },

  validateQueryParamQty: (req, res, next) => {
    const value = validators.validateQueryParamQty(req.query.qty);

    if (value.error_code) {
      return res.status(400).send(value);
    }

    return next();
  },

  validateEmptyPagination(req, res, next) {
    const { page, qty } = req.query;

    if (!page && !qty) {
      next();
    } else {
      next('route');
    }
  },
};
