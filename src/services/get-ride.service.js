const db = require('../utils/db');
const logger = require('../utils/logger');

const { notFoundResponse, serverErrorResponse } = require('../utils/response-formatter');

module.exports = {
  /**
     * Get a Ride.
     * @function
     * @param {straem} req - The request stream.
     * @param {stream} res - The response stream.
     * @returns {Object} - Ride object
     */
    getRide: async (req, res) => {
      const queryStmt = `SELECT * FROM Rides WHERE rideID='${req.params.id}'`;
      try {
        const row = await db.query(queryStmt);
        const status = row.length === 0 ? 404 : 200;
        return res.status(status).send(notFoundResponse(row));
      } catch (error) {
        logger.error(error);
        return res.status(500).send(serverErrorResponse());
      }
    },

  };
