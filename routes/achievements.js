const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');
const cors = require('cors');

const app = express();
app.use(cors());

Router.get("/", (req, res) => {
  const queryString = `
  SELECT a.badge_id, a.frequency, a.starts_on, a.ends_on, a.category, a.category_ratio, b.name, b.image
  FROM achievements a, achievement_badges b
  WHERE a.badge_id = b.id;`
  sqlConnection.query(queryString, (err, row, fields) => {
      if (!err) {
      res.send(row)
    } else {
      console.log("Query Error");
    };
  });
});

module.exports = Router;
