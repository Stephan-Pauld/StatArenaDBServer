const mysql = require ('mysql');

// let dbParams = {};
// if (process.env.DATABASE_URL) {
//   dbParams.connectionString = process.env.DATABASE_URL;
// } else {
//   dbParams = {
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE
//   };
// }




const sqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'stat_site'
})

sqlConnection.connect((err)=> {
	if(err) {
		console.log(err);
		console.log("Connection Failed...");
	} else {
		console.log('Connected To The DataBase');
	}
})






module.exports = sqlConnection;

