const { expect } = require('chai');
const Chance = require('chance')();

const {
  notFoundResponse,
  serverErrorResponse,
  validateQueryParamPage,
  validateQueryParamQty,
  validateStartLatLong,
  validateEndLatLong,
} = require('../src/utils/response-formatter');

describe('Response Test', () => {
  describe('notFoundResponse Test', () => {
    it('notFoundResponse will be of type function', () => {
      expect(typeof notFoundResponse).to.equal('function');
    });

    it('notFoundResponse shall return an array , if length of array is more than one', () => {
      const randomData = [];
      const randomItemCount = Chance.integer({ min: 1, max: 50 });

      for (let i = 0; i < randomItemCount; i += 1) {
        const randomString = Chance.string({ length: 5 });
        randomData.push(randomString);
      }

      const value = notFoundResponse(randomData);
      expect(value).to.deep.equal(value);
    });

    it('notFoundResponse shall return empty object, if array is empty', () => {
      const randomData = [];
      const value = notFoundResponse(randomData);
      expect(value).to.have.property('error_code');
      expect(value).to.have.property('message');
      expect(value.error_code).to.equal('RIDES_NOT_FOUND_ERROR');
      expect(value.message).to.equal('Could not find any rides');
    });
  });

  describe('serverErrorResponse Test', () => {
    it('serverErrorResponse shall be of type function', () => {
      expect(typeof serverErrorResponse).to.equal('function');
    });

    it('serverErrorResponse shall return correct object', () => {
      const value = serverErrorResponse();
      expect(value).to.have.property('error_code');
      expect(value).to.have.property('message');
      expect(value.error_code).to.equal('SERVER_ERROR');
      expect(value.message).to.equal('Unknown error');
    });
  });
  describe('validateQueryParamPage Test', () => {
    it('validateQueryParamPage shall be of type function', () => {
      expect(typeof validateQueryParamPage).to.equal('function');
    });

    it('validateQueryParamPage shall return correct object, if argument is invalid', () => {
      const invalidArgument = Chance.integer({ min: -100, max: -1 });
      const value = validateQueryParamPage(invalidArgument);
      expect(value).to.have.property('error_code');
      expect(value).to.have.property('message');
      expect(value.error_code).to.equal('VALIDATION_ERROR');
      expect(value.message).to.equal('Value of page must be a positive integer');
    });

    it('validateQueryParamPage shall return true, if argument is valid', () => {
      const validArgument = Chance.integer({ min: 1 });
      const value = validateQueryParamPage(validArgument);
      expect(value).to.deep.equal(true);
    });
  });

  describe('validateQueryParamQty Test', () => {
    it('validateQueryParamQty shall be of type function', () => {
      expect(typeof validateQueryParamQty).to.equal('function');
    });

    it('outputQty shall return correct object, if argument is invalid', () => {
      const invalidArgument = Chance.integer({ min: -100, max: -1 });
      const value = validateQueryParamQty(invalidArgument);
      expect(value).to.have.property('error_code');
      expect(value).to.have.property('message');
      expect(value.error_code).to.equal('VALIDATION_ERROR');
      expect(value.message).to.equal('Value of qty must be a positive integer');
    });

    it('validateQueryParamQty shall return correct object, if argument is valid', () => {
      const validArgument = Chance.integer({ min: 1 });
      const value = validateQueryParamQty(validArgument);
      expect(value).to.deep.equal(true);
    });
  });

  describe('validateStartLatLong Test', () => {
    it('validateStartLatLong shall be of type function', () => {
      expect(typeof validateStartLatLong).to.equal('function');
    });

    it('validateStartLatLong shall return correct object, if argument is invalid', () => {
      const invalidLatitude = Chance.string({ alpha: true });
      const invalidLongtitude = Chance.string({ alpha: true });

      const value = validateStartLatLong(invalidLatitude, invalidLongtitude);
      expect(value).to.have.property('status');
      expect(value).to.have.property('err_msg');
      expect(value.err_msg.error_code).to.equal('VALIDATION_ERROR');
      expect(value.err_msg.message).to.equal('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    });

    it('validateStartLatLong shall return correct object, if argument is valid', () => {
      const validLatitude = Chance.latitude({ fixed: 5 });
      const validLongtitude = Chance.longitude({ fixed: 5 });

      const value = validateStartLatLong(validLatitude, validLongtitude);
      expect(value).to.deep.equal({});
    });
  });

  describe('validateEndLatLong Test', () => {
    it('validateEndLatLong shall be of type function', () => {
      expect(typeof validateEndLatLong).to.equal('function');
    });

    it('validateEndLatLong shall return correct object, if argument is invalid', () => {
      const invalidLatitude = Chance.string({ alpha: true });
      const invalidLongtitude = Chance.string({ alpha: true });

      const value = validateEndLatLong(invalidLatitude, invalidLongtitude);
      expect(value).to.have.property('status');
      expect(value).to.have.property('err_msg');
      expect(value.err_msg.error_code).to.equal('VALIDATION_ERROR');
      expect(value.err_msg.message).to.equal('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    });

    it('validateEndLatLong shall return correct object, if argument is valid', () => {
      const validLatitude = Chance.latitude({ fixed: 5 });
      const validLongtitude = Chance.longitude({ fixed: 5 });

      const value = validateEndLatLong(validLatitude, validLongtitude);
      expect(value).to.deep.equal({});
    });
  });
});
