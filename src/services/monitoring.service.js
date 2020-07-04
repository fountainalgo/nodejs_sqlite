module.exports = {
/**
 * Check the health of the API.
 * @function
 * @param {straem} req - The request stream.
 * @param {stream} res - The response stream.
 * @returns {string} - "Healthy"
 */
  getHealthStatus: async (req, res) => {
    res.send('Healthy');
  },
};
