const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("./consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const express = require("express");
const cors = require('cors')
const redis = require('redis');
const port = process.env.PORT || 3030


const client = redis.createClient(process.env.REDIS_URL);
const app = express();
app.use(express.static("public"));
app.use(cors())
app.use(express.json())

const achievementObj = {
	oneHundredWins: 'https://www.flaticon.com/svg/static/icons/svg/3135/3135783.svg',
	fiftyWins: "https://www.flaticon.com/svg/static/icons/svg/1170/1170611.svg",
	firstWin: "https://www.flaticon.com/svg/static/icons/svg/3938/3938361.svg"
}
const favGuns = []

function cache(key) {

	if (key === "-guns") {
		return function(req, res, next) {
			const { username } = req.params;
			client.get(`${username}${key}`, (err, data) =>{
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
		return function(req, res, next) {
			const { username } = req.params;
			client.get(`${username}${key}`, (err, data) =>{
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



app.get("/g/:username", cache("-guns"), (req, res) => {
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


app.get("/achieve/:username", cache("-achievements"), (req, res) => {
	console.log("DOES THIS EVEN HAPPEN");
	async function getAchievements() {
		try {
			console.log("Sending acheives");
			const { username } = req.params
			const achievements = JSON.stringify(achievementObj)
			console.log(username);
			client.setex(`${username}-achievements`, 3600, achievements)
			
			res.send(achievements)
		} catch (error) {
			
			console.log("Data Error");
			console.log(error);
		}
	}
	getAchievements()
});


app.get("/favorites/:username", (req, res) => {
	console.log("Getting the favourties");
	res.send(favGuns)
})

app.post("/favourited/:username", (req,res) => {
	// console.log(req.body);
	favGuns.push(req.body)
	// console.log(favGuns);
})




app.listen(port, () => {
	console.log("Example app listening on port " + port);
});