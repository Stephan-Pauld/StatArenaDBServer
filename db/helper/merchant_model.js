const sqlConnection = require('../../lib/db.js');

// const Pool = require('pg').Pool;
// const pool = new Pool({
//   user: 'my_user',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'root',
//   port: 5432,
// });

const getDropZone = () => {
  // return sqlConnection.query('SELECT * FROM dropzone ORDER BY RAND() LIMIT 1;');
//   sqlConnection.query('SELECT * FROM dropzone ORDER BY RAND() LIMIT 1;', (error, results) => {
//     if (error) {
//       return error;
//     }
//     console.log("Merchant Model query: ", results);
//     return results;
//   });
};

// const getDropZone = () => {
//   return new Promise(function(resolve, reject) {
//     pool.query('SELECT * FROM dropzone;', (error, results) => {
//       if (error) {
//         reject(error);
//       }
//       console.log("hello", results);
//       resolve(results.rows);
//     });
//   });
// };

const getGun = () => {
  sqlConnection.query('SELECT * FROM weapon ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return error;
    }
    return results.rows;
  });
};

// const getGun = () => {
//   return new Promise(function(resolve, reject) {
//     pool.query('SELECT * FROM weapon;', (error, results) => {
//       if (error) {
//         reject(error);
//       }
      
//       resolve(results.rows);
//     });
//   });
// };


const getRules = () => {
  sqlConnection.query('SELECT * FROM rules ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return error;
    }
    return results.rows;
  });
};

// const getRules = () => {
//   return new Promise(function(resolve, reject) {
//     pool.query('SELECT * FROM rules;', (error, results) => {
//       if (error) {
//         reject(error);
//       }
      
//       resolve(results.rows);
//     });
//   });
// };

module.exports = {
  getDropZone,
  getRules,
  getGun
};