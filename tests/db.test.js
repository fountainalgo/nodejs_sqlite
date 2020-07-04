const { expect } = require('chai');
const sinon = require('sinon');

const utilsDB = require('../src/utils/db');

describe('DB tests', () => {
  let dbExecStub;
  let dbQueryStub;

  before(() => {
    dbExecStub = sinon.stub(utilsDB.db, 'run');
    dbQueryStub = sinon.stub(utilsDB.db, 'all');
  });

  after(() => {
    dbExecStub.restore();
    dbQueryStub.restore();

    if (utilsDB.db.run.restore) {
      utilsDB.db.run.restore();
    }

    if (utilsDB.db.all.restore) {
      utilsDB.db.all.restore();
    }
  });

  it('exec must be of type function', () => {
    expect(typeof utilsDB.exec).to.equal('function');
  });

  it('exec must call the run function of db', async () => {
    dbExecStub.yieldsRight();
    await utilsDB.exec('', []);
    expect(dbExecStub.called).to.equal(true);
  });

  it('query must be of type function', () => {
    expect(typeof utilsDB.query).to.equal('function');
  });

  it('query must call all function of db', async () => {
    dbQueryStub.yieldsRight();
    await utilsDB.query('', []);
    expect(dbQueryStub.called).to.equal(true);
  });

  it('if DB error occurs, exec must throw an error', async () => {
    dbExecStub.yieldsRight(new Error());
    let isThrowError;

    try {
      await utilsDB.exec('', []);
      isThrowError = false;
    } catch (e) {
      isThrowError = true;
    }

    expect(isThrowError).to.equal(true);
  });

  it('if DB error occurs, query must throw an error', async () => {
    dbQueryStub.yieldsRight(new Error());
    let isThrowError;

    try {
      await utilsDB.query('', []);
      isThrowError = false;
    } catch (e) {
      isThrowError = true;
    }

    expect(isThrowError).to.equal(true);
  });
});
