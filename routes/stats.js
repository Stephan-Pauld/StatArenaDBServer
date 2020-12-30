const express = require("express");
const Router = express.Router();
require('dotenv').config();
const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("../consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const cors = require('cors')
const redis = require('redis');
const port = process.env.PORT || 3030
const bodyParser = require ('body-parser');
const sqlConnection = require('../lib/db.js');
const client = redis.createClient(process.env.REDIS_URL);

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


function cache(key) {
	if (key === "-guns") {
		return function (req, res, next) {
			const { username } = req.params;
			client.get(`${username}${key}`, (err, data) => {
				if (err) throw err;

				if (data !== null) {
					console.log("Grabbing Cached for Guns!!");
					res.send(JSON.parse(data))
				} else {
					next()
				}
			})
		}
	} else if (key === "-achievements") {
		return function (req, res, next) {
			const { username } = req.params;
			client.get(`${username}${key}`, (err, data) => {
				if (err) throw err;

				if (data !== null) {
					console.log("Grabbing Cached for Achieves!!");
					res.send(JSON.parse(data))
				} else {
					next()
				}
			})
		}
	}
}

Router.get("/moho", cache("-guns"), (req, res) => {
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

			client.setex(`${username}-guns`, 3600, guns)

			res.send(guns)
		} catch (error) {
			console.log("Data Error");
			console.log(error);
		}
	}
	getData()
});

// Router.get("/achieve/:username", cache("-achievements"), (req, res) => {
  
// 	async function getAchievements() {
// 		try {
// 			console.log("Sending acheives");
// 			const { username } = req.params
// 			const achievements = JSON.stringify(achievementObj)
// 			console.log(username);
// 			client.setex(`${username}-achievements`, 3600, achievements)

// 			res.send(achievements)
// 		} catch (error) {

// 			console.log("Data Error");
// 			console.log(error);
// 		}
// 	}
// 	getAchievements()
// });

module.exports = Router

