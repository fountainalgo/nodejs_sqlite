const request = require('supertest');
 const sinon = require('sinon');
const { expect } = require('chai');
const Chance = require('chance')();

const app = require('../src/app')();
const utilsDB = require('../src/utils/db');

describe('Get /ride/{id} tests', () => {
  describe('GET /ride/:id', () => {
    afterEach(() => {
      if (utilsDB.query.restore) {
        utilsDB.query.restore();
      }
    });

    it('Endpoint should be available', (done) => {
      const randomId = Chance.guid({ version: 4 });
      request(app)
        .get(`/ride/${randomId}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.have.property('error_code');
          expect(response.body).to.have.property('message');
          expect(response.body.error_code).to.equal('RIDES_NOT_FOUND_ERROR');
          expect(response.body.message).to.equal('Could not find any rides');
          done();
        });
    });

    it('If invalid ride id is passed, response must contain error payload', (done) => {
      // sinon.stub(utilsDB, 'query').rejects(new Error('error'));
      const invalidId = Chance.string({ alpha: true });
      request(app)
        .get(`/ride/${invalidId}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(Object.keys(response.body).length).to.be.equal(2);
          expect(response.body).to.have.property('error_code');
          expect(response.body).to.have.property('message');
          expect(response.body.error_code).to.equal('RIDES_NOT_FOUND_ERROR');
          expect(response.body.message).to.equal('Could not find any rides');
          done();
        });
    });

    it('If an error occurs retrieving ride data, response must contain corrent payload', (done) => {
       sinon.stub(utilsDB, 'query').rejects(new Error('error'));
      const randomId = Chance.guid({ version: 4 });

      request(app)
        .get(`/ride/${randomId}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(Object.keys(response.body).length).to.be.equal(2);
          expect(response.body).to.have.property('error_code');
          expect(response.body).to.have.property('message');
          expect(response.body.error_code).to.equal('SERVER_ERROR');
          expect(response.body.message).to.equal('Unknown error');
          done();
        });
    });

    it('If no ride data are available, response must contain corrent payload', (done) => {
      sinon.stub(utilsDB, 'query').resolves([]);
      const randomId = Math.floor(Math.random() * Math.floor(5));

      request(app)
        .get(`/ride/${randomId}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(Object.keys(response.body).length).to.be.equal(2);
          expect(response.body).to.have.property('error_code');
          expect(response.body).to.have.property('message');
          expect(response.body.error_code).to.equal('RIDES_NOT_FOUND_ERROR');
          expect(response.body.message).to.equal('Could not find any rides');
          done();
        });
    });
  });
});
