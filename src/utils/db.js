const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

module.exports = {
  query: (query, params) => (
    new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    })
  ),
  exec: (query, params) => (
    new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        }
        resolve(this);
      });
    })
  ),
  db,
};
