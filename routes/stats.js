const express = require("express");
const Router = express.Router();
require('dotenv').config();
const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("../consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const cors = require('cors')
const redis = require('redis');
const bodyParser = require('body-parser');
const client = redis.createClient(process.env.REDIS_URL);

function cache(key) {
	if (key === "-data") {
		return function (req, res, next) {
			const gamerTag = req.params.gamerTag
			client.get(`${gamerTag}`, (err, data) => {
				if (err) throw err;
				if (data !== null) {
					console.log("Grabbing Cached AllData!! for", gamerTag);
					res.send(JSON.parse(data));
				} else {
					next();
				};
			});
		};
	} else if (key === "-tracked") {
		return function (req, res, next) {
			const { username, gunName } = req.params;
			client.get(`${username}-${gunName}${key}`, (err, data) => {
				if (err) throw err;
				if (data !== null) {
					const parsed = JSON.parse(data)
					const fixedData = { data: parsed, gun: gunName }
					console.log("Grabbing Cached for TrackedStats!!", gunName);
					res.send(JSON.parse(data));
				} else {
					next();
				};
			});
		};
	};
};

Router.get("/:gamerTag&:platform", cache('-data'), (req, res) => {
	let gamerTag;
	let gamerPlatform;

	if (req.params.gamerTag && req.params.platform) {
		gamerTag = req.params.gamerTag
		gamerPlatform = req.params.platform
		console.log(gamerPlatform);
	} else {
		gamerTag = USERNAME;
		gamerPlatform = PLATFORM;
	}
	async function getGunData() {
		try {
			await API.login(EMAIL, PASSWORD); // need usersname and pass from https://www.callofduty.com/
			console.log("Logging In");
		} catch (Error) {
			console.log("Login Error");
		}
		try {
			let data = await API.MWwz(gamerTag, gamerPlatform);
			console.log("Sending ALL Data!!!");

			if (data.weekly.all.properties !== null) {
				const allData = [
					{ weeklyData: data.weekly },
					{ gameModes: data.lifetime.mode },
					{ guns: data.lifetime.itemData },
					{ lifetimeData: data.lifetime.all.properties },
          {	allstats: data},
          {error: null}
				];
				const newData = JSON.stringify(allData);
				client.setex(`${gamerTag}`, 86400 , newData);
				res.send(allData);
			}
			else {
				const allData = [
					{ weeklyData: null },
					{ gameModes: data.lifetime.mode },
					{ guns: data.lifetime.itemData },
					{ lifetimeData: data.lifetime.all.properties },
          {	allstats: data},
          {error: null}
				];
				const newData = JSON.stringify(allData);
				client.setex(`${gamerTag}`, 86400 , newData);
				res.send(allData);
			};
		}
		catch (error) {
      console.log("Data Error");
      const allData = [
        { weeklyData: null },
        { gameModes: null },
        { guns: null },
        { lifetimeData: null },
        {	allstats: null},
        {error: "error"}
      ];
      res.json(allData)
		};
	};
	getGunData();
});

module.exports = Router;