const express = require("express");
const Router = express.Router();
require('dotenv').config();
const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("../consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const cors = require('cors')
const redis = require('redis');
// const port = process.env.PORT || 3030
const bodyParser = require('body-parser');
// const sqlConnection = require('../lib/db.js');
const client = redis.createClient(process.env.REDIS_URL);



function cache(key) {
	console.log("Checking");
	if (key === "-data") {
		return function (req, res, next) {
			const { username } = req.params;

			client.get(`${username}`, (err, data) => {

				if (err) throw err;
				if (data !== null) {
          console.log("Grabbing Cached AllData!!");
					res.send(JSON.parse(data))
				} else {
					next()
				}
			})
		}
	} else if (key === "-tracked") {
		return function (req, res, next) {

			const { username, gunName } = req.params;
			client.get(`${username}-${gunName}${key}`, (err, data) => {
				if (err) throw err;

				if (data !== null) {
					const parsed = JSON.parse(data)
					const fixedData = { data: parsed, gun: gunName }
					console.log("Grabbing Cached for TrackedStats!!", gunName);
					res.send(JSON.parse(data))
				} else {
					next()
				}
			})
		}
  } 
  // else if (key === "-overlay") {
	// 	return function (req, res, next) {

	// 		const { username } = req.params;
	// 		client.get(`${username}${key}`, (err, data) => {
	// 			if (err) throw err;

	// 			if (data !== null) {
	// 				console.log("Grabbing Cached for OverlayStats!!");

	// 				const allData = JSON.parse(data);

	// 				const stats = [
	// 					{ weeklyData: allData.weekly },
	// 					{ gameModes: allData.lifetime.mode },
	// 					{ guns: allData.lifetime.itemData },
	// 				]

	// 				res.send(stats)
	// 			} else {
	// 				next()
	// 			}
	// 		})
	// 	}
	// }
}
// console.log("hereeee");
// Router.post("/:username", (req, res) => {
//   console.log("hello");
 
//   console.log(req.body);
//   res.status(200).end()
// })


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

			const { username, gunName, category } = req.params
			console.log("Sending Tracked Data!!!", username, gunName, category);
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
// SardarMamad#3717309
// , cache('-data'):gamerTag&:platfrom
// 

Router.get("/:gamerTag&:platform", cache('-data'), (req, res) => {
  console.log('Server side: ', req.params);
  let gamerTag;
  let gamerPlatform;

  if (req.params.gamerTag && req.params.platform) {
    console.log("Setting gamer info from params...");
     gamerTag = req.params.gamerTag
     gamerPlatform = req.params.platform
     console.log(gamerPlatform);
    
  } else {
    console.log("Setting gamer info from ENVIRONMENT...");
    gamerTag = USERNAME;
    gamerPlatform = PLATFORM;
  }  
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
			let data = await API.MWwz(gamerTag, gamerPlatform);
			console.log("Sending ALL Data!!!");
			// const { username } = req.params

      if (data.weekly.all.properties !== null) {
        const allData = [
          { weeklyData: data.weekly },
          { gameModes: data.lifetime.mode },
          { guns: data.lifetime.itemData },
          { lifetimeData: data.lifetime.all.properties }
        ];  
          const newData = JSON.stringify(allData)
          client.setex(`${gamerTag}`, 3600, newData)
          res.send(allData)
        }
      else {
        const allData = [
          { weeklyData: null },
          { gameModes: data.lifetime.mode },
          { guns: data.lifetime.itemData },
          { lifetimeData: data.lifetime.all.properties }
        ];
          const newData = JSON.stringify(allData)
          client.setex(`${gamerTag}`, 3600, newData)
          res.send(allData)
        };
    } 
    catch (error) {
			console.log("Data Error");
			console.log(error);
		}
	}
	getGunData()
});

// Router.get("/allstats/:username", cache("-stats"), (req, res) => {
// 	async function getAllData() {
// 		try {
// 			await API.login(EMAIL, PASSWORD); // need usersname and pass from https://www.callofduty.com/
// 			console.log("Logging In");
// 		} catch (Error) {
// 			//Handle Exception
// 			console.log("Login Error");

// 			console.log("error");
// 		}
// 		try {
// 			let data = await API.MWwz(USERNAME, PLATFORM);
// 			console.log("Sending All Data!!!");

// 			const { username } = req.params

// 			const allData = JSON.stringify(data)
// 			console.log(username);

// 			client.setex(`${username}-stats`, 3600, allData)

// 			res.send(allData)
// 		} catch (error) {
// 			console.log("Data Error");
// 			console.log(error);
// 		}
// 	}
// 	getAllData()
// });


// Router.get("/overlay/:username", cache("-overlay"), (req, res) => {
// 	async function getAllOverlayData() {
// 		try {
// 			await API.login(EMAIL, PASSWORD); // need usersname and pass from https://www.callofduty.com/
// 			console.log("Logging In");
// 		} catch (Error) {
// 			//Handle Exception
// 			console.log("Login Error");

// 			console.log("error");
// 		}
// 		try {
// 			let data = await API.MWwz(USERNAME, PLATFORM);
// 			console.log("Sending All Data for overlay!!!");

// 			const { username } = req.params

// 			const allData = JSON.stringify(data)
// 			console.log(username);

// 			client.setex(`${username}-overlay`, 3600, allData)

// 			res.send(allData)
// 		} catch (error) {
// 			console.log("Data Error");
// 			console.log(error);
// 		}
// 	}
// 	getAllOverlayData()
// });





module.exports = Router;

