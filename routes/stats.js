const express = require("express");
const Router = express.Router();
require('dotenv').config();
const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("../consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const cors = require('cors')
const redis = require('redis');
const port = process.env.PORT || 3030
const bodyParser = require('body-parser');
const sqlConnection = require('../lib/db.js');
const client = redis.createClient(process.env.REDIS_URL);

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

function cache(key) {
	console.log("Checking");
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
	} else if (key === "-stats") {
		return function (req, res, next) {
			const { username } = req.params;
			client.get(`${username}${key}`, (err, data) => {
				if (err) throw err;

				if (data !== null) {
					console.log("Grabbing Cached for Stats!!");

					const allData = JSON.parse(data);
					const gameModes = allData.lifetime.mode

					res.send(gameModes)
				} else {
					next()
				}
			})
		}
	} if (key === "-tracked") {
		return function (req, res, next) {

			const { username, gunName } = req.params;
			client.get(`${username}-${gunName}${key}`, (err, data) => {
				if (err) throw err;

				if (data !== null) {
					const parsed = JSON.parse(data)
					const fixedData = {data: parsed, gun: gunName}
					console.log("Grabbing Cached for TrackedStats!!", gunName);
					res.send(JSON.parse(data))
				} else {
					next()
				}
			})
		}
	}
}

Router.get("/:username/:gunName/:category", cache('-tracked'), (req, res) => {
	async function getTrackedData() {
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

			console.log("Sending Tracked Data!!!");
			const { username, gunName, category } = req.params
	
			const trackedStat = JSON.stringify(data.lifetime.itemData[category][gunName])
			console.log(username, "is getting data for a tracked gun: ", gunName);
	
			client.setex(`${username}-${gunName}-tracked`, 3600, trackedStat)
	
			res.send(trackedStat)
		} catch (error) {
			console.log("Data Error");
			console.log(error);
		}
	}
	getTrackedData()
});



Router.get("/:username", cache("-guns"), (req, res) => {
	async function getGunData() {
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
			console.log("Sending Gun Data!!!");

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
	getGunData()
});

Router.get("/allstats/:username", cache("-stats"), (req, res) => {
	async function getAllData() {
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
			console.log("Sending All Data!!!");

			const { username } = req.params

			const allData = JSON.stringify(data)
			console.log(username);

			client.setex(`${username}-stats`, 3600, allData)

			res.send(allData)
		} catch (error) {
			console.log("Data Error");
			console.log(error);
		}
	}
	getAllData()
});

// Router.get("/allstats", (req, res) => {
// 	console.log("Cats");
// 	res.send("Toast")
// });

module.exports = Router

