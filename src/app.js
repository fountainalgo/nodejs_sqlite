const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8010;
const rootPath = require('path');

const jsonParser = bodyParser.json();
const swaggerJSDoc = require('swagger-jsdoc');
const { getHealthStatus } = require('./services/monitoring.service');
const { addaNewRide } = require('./services/add-ride.service');
const { getRides } = require('./services/get-rides.service');
const { getRide } = require('./services/get-ride.service');
const { validateQueryParamPage, validateQueryParamQty, validateEmptyPagination } = require('./validators/rides.validators');
const { validateStartLatLong, validateEndLatLong } = require('./validators/add-ride.validators');

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: 'API Documentation for Ride System',
    version: '1.0.0',
    description: 'Create, List, Manage Rides',
  },
  host: `localhost:${port}`,
  basePath: '/',
};
const options = {
  swaggerDefinition,
  apis: [rootPath.resolve(__dirname, 'docs/*.yml')],
};
const swaggerSpec = swaggerJSDoc(options);
// -- End setup up swagger-jsdoc --

  module.exports = () => {
    app.get('/health', getHealthStatus);

    app.post('/ride', [jsonParser, validateStartLatLong, validateEndLatLong], addaNewRide);
    app.get('/rides', [validateEmptyPagination], getRides);
    app.get('/rides', [validateQueryParamPage, validateQueryParamQty], getRides);

    app.get('/ride/:id', getRide);

    app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    app.get('/api-docs', (req, res) => {
      res.sendFile(rootPath.join(__dirname, 'docs/apidoc.html'));
    });
    return app;
  };
