require('dotenv').config();
const { REDIS_PORT, EMAIL, PASSWORD, USERNAME, PLATFORM } = require("./consts");
const API = require('call-of-duty-api')({ platform: "acti" });
const express = require("express");
const cors = require('cors')
const redis = require('redis');
const port = process.env.PORT || 3030
const bodyParser = require ('body-parser');
const sqlConnection = require('./lib/db.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


const usersRoutes = require("./routes/users");
const trackedStatsRoutes = require("./routes/trackedStats");
const achievementsRoutes = require("./routes/achievements");
const statRoutes         = require("./routes/stats");

app.use("/users", usersRoutes);
app.use("/trackedstats", trackedStatsRoutes);
app.use("/achievements", achievementsRoutes);
app.use("/stats", statRoutes);






app.listen(port, () => {
	console.log("Example app listening on port " + port);
});