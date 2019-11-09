const mysql = require('mysql');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        console.log("async-db query");
        if (err) {
          console.log(err);
          console.log(err.sql);
          console.log('');
          return reject(err);
        }
        console.log('');
        console.log("async-db query rows returned are:");
        console.log(rows);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {return reject(err); }
        resolve();
      });
    });
  }
}

module.exports = Database;
