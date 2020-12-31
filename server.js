const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("./consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
/* const redis = require('redis'); */
const { restart } = require("nodemon");
const port = process.env.DB_PORT || 8080;

/* const client = redis.createClient(process.env.REDIS_URL); */
const app = express();
app.use(express.static("public"));
app.use(cors());


/* function cache(req, res, next) {
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
} */
//, cache
/* app.get("/g/:username", (req, res) => {

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
});  */

app.get("/nickname=:nickname&platform=:platform", (req, res) => {
  console.log(req.params.nickname);
  console.log(req.params.platform);
  let gamerId = req.params.nickname.data;
  res.send(gamerId);
  
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});