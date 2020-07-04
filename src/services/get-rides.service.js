const db = require('../utils/db');
const logger = require('../utils/logger');
const { notFoundResponse, serverErrorResponse } = require('../utils/response-formatter');

module.exports = {
  /**
     * Get all the Ride.
     * @function
     * @param {straem} req - The request stream.
     * @param {stream} res - The response stream.
     * @returns {Array} - List of Rides
     */

    getRides: async (req, res) => {
        const { page, qty } = req.query;
        const values = [];
        let queryStmt;
        if (page && qty) {
          queryStmt = 'SELECT * FROM Rides LIMIT (?) OFFSET (?)';
          const pageQty = parseInt(qty, 10);
          const pageInt = parseInt(page, 10);
          values.push(pageQty);
          values.push(((pageInt - 1) * pageQty));
        } else {
          queryStmt = 'SELECT * FROM Rides';
        }
      try {
        const rows = await db.query(queryStmt, values);
        const status = rows.length === 0 ? 404 : 200;
        return res.status(status).send(notFoundResponse(rows));
      } catch (error) {
          logger.error(error);
          return res.status(500).send(serverErrorResponse());
      }
    },

  };
