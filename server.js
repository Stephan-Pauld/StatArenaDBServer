const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("./consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const express = require("express");
const cors = require('cors')
const redis = require('redis');
const port = process.env.PORT || 8080

const client = redis.createClient(process.env.REDIS_URL);
const app = express();
app.use(express.static("public"));

app.use(cors())

// app.use(function (req, res, next) {

// 	// Website you wish to allow to connect
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// 	// Request methods you wish to allow
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// 	// Request headers you wish to allow
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	next();
// });


function cache(req, res, next) {
	const { username } = req.params;

	client.get(username, (err, data) =>{
		if (err) throw err;

		if (data !== null) {
			console.log("Grabbing Cached DATA!!");
			res.send(JSON.parse(data))
		} else {
			next()
		}
	})
}

app.get("/g/:username", cache, (req, res) => {

	async function getData() {
		try {
			await API.login(EMAIL, PASSWORD); // need usersname and pass from https://www.callofduty.com/
			console.log("Logging In");
		} catch (Error) {
			//Handle Exception
			console.log("Login Error");

			console.log("error");
		}
		try {
			let data = await API.MWwz(USERNAME, PLATFORM);
			console.log("Sending Data!!!");

			const { username } = req.params

			const guns = JSON.stringify(data.lifetime.itemData)
			console.log(username);
			client.setex(username, 3600, guns)

			res.send(guns)
		} catch (error) {
			console.log("Data Error");
			console.log(error);
		}
	}
	getData()
});

app.listen(port, () => {
	console.log("Example app listening on port " + port);
});