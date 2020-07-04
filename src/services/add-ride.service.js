const db = require('../utils/db');
const logger = require('../utils/logger');
const { serverErrorResponse } = require('../utils/response-formatter');

module.exports = {

  /**
     * Add a new Ride.
     * @function
     * @param {straem} req - The request stream.
     * @param {stream} res - The response stream.
     * @returns {Object} - Ride object
     */

  addaNewRide: async (req, res) => {
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;
    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Driver name must be a non empty string',
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Vehicle type must be a non empty string',
      });
    }
    const values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
    try {
      const result = await db.exec('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
      const rows = await db.query('SELECT * FROM Rides WHERE rideID = ?', result.lastID);
      return res.send(rows);
    } catch (error) {
      logger.error(error);
      return res.status(500).send(serverErrorResponse());
    }
  },

};
