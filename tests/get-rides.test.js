const request = require('supertest');
// const sinon = require('sinon');
const { expect } = require('chai');
const Chance = require('chance')();

const app = require('../src/app')();
const utilsDB = require('../src/utils/db');

describe('API tests', () => {
  describe('GET /rides', () => {
    afterEach(() => {
      if (utilsDB.exec.restore) {
        utilsDB.exec.restore();
      }
    });

    it('Endpoint should be available', (done) => {
      request(app)
        .get('/rides')
        .expect(200, done);
    });

    it('If rides data are available and pagination was not provided, response must contain all ride data', async () => {
      const mockDBDataCount = Chance.integer({ min: 1, max: 6 });
      const mockData = [];

      for (let i = 0; i < mockDBDataCount; i += 1) {
        mockData.push({
          startLat: Chance.latitude({ fixed: 5 }),
          startLong: Chance.longitude({ fixed: 5 }),
          endLat: Chance.latitude({ fixed: 5 }),
          endLong: Chance.longitude({ fixed: 5 }),
          riderName: Chance.string({ length: 5 }),
          driverName: Chance.string({ length: 5 }),
          driverVehicle: Chance.string({ length: 5 }),
        });
      }

      const insertQuery = 'INSERT INTO Rides( startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

      await Promise.all(mockData.map(
        (data) => utilsDB.exec(insertQuery, Object.values(data)),
      ));

      return request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.length).to.be.equal(mockData.length + 1);
        });
    });

    it('If invalid page pagination was given, response must contain correct error payload', (done) => {
      const invalidPagePagination = Chance.string({ alpha: true });
      const validQtyPagination = Chance.integer({ min: 1 });
      request(app)
        .get('/rides')
        .query({ page: invalidPagePagination })
        .query({ qty: validQtyPagination })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          const payload = response.body;
          expect(Object.keys(payload).length).to.be.equal(2);
          expect(payload).to.have.property('error_code');
          expect(payload).to.have.property('message');
          expect(payload.error_code).to.equal('VALIDATION_ERROR');
          expect(payload.message).to.equal('Value of page must be a positive integer');

          done();
        });
    });

    it('If invalid qty pagination was given, response must contain correct error payload', (done) => {
      const validPagePagination = Chance.integer({ min: 1 });
      const invalidQtyPagination = Chance.string({ alpha: true });

      request(app)
        .get('/rides')
        .query({ page: validPagePagination })
        .query({ qty: invalidQtyPagination })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          const payload = response.body;
          expect(payload).to.have.property('error_code');
          expect(payload).to.have.property('message');
          expect(payload.error_code).to.equal('VALIDATION_ERROR');
          expect(payload.message).to.equal('Value of qty must be a positive integer');
          done();
        });
    });

    it('If invalid page and qty pagination was given, response must contain correct error payload', (done) => {
      const invalidPagePagination = Chance.string({ alpha: true });
      const invalidQtyPagination = Chance.string({ alpha: true });

      request(app)
        .get('/rides')
        .query({ page: invalidPagePagination })
        .query({ qty: invalidQtyPagination })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          const payload = response.body;
          expect(Object.keys(payload).length).to.be.equal(2);
          expect(payload).to.have.property('error_code');
          expect(payload).to.have.property('message');
          expect(payload.error_code).to.equal('VALIDATION_ERROR');
          done();
        });
    });
  });
});
