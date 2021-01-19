const mysql = require ('mysql');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.MYS_HOST,
    port: process.env.MYS_PORT,
    user: process.env.MYS_USER,
    password: process.env.MYS_PASSWORD,
    database: process.env.MYS_DATABASE
  };
}

const sqlConnection = mysql.createConnection(dbParams);

sqlConnection.connect((err)=> {
	if(err) {
		console.log(err);
		console.log("Connection Failed...");
	} else {
		console.log('Connected To The DataBase');
	}
})

module.exports = sqlConnection;

