const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

Router.put("/create", (req, res) => {

  const overlayStats = JSON.stringify(req.body.stats)

  const queryString = `
INSERT INTO user_overlay_data (size, user_id, uniqueURLKey, stats) VALUES ('${req.body.size}', 1, '${req.body.urlKey}', '${overlayStats}');`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(req.body.urlKey);
    } else {
      console.log("Query Error", err);
    };
  });

})

Router.get("/show/:urlKey", (req, res) => {

  
  const queryString = `SELECT * FROM user_overlay_data WHERE uniqueURLKey = '${req.params.urlKey}'`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row);
    } else {
      console.log("Query Error", err);
    };
  });

})

module.exports = Router



