const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');
const cors = require('cors');
const app = express();
app.use(cors());

const addNewGun = (trackedStat, gun) => {
  const queryString = `
  INSERT INTO user_tracked_stats (user_id, tracked_item, stat_name) 
  VALUES (1, '${trackedStat}', '${gun}');`;

  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Query Error", err);
    };
  });
};

const removeStat = (id) => {
  const queryString = `DELETE FROM user_tracked_stats WHERE id = ${id};`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      return row;
    } else {
      console.log("Error Deleting user tracked stats!");
      return;
    };
  });
};

Router.get("/", (req, res) => {
  const queryString = `SELECT * FROM user_tracked_stats;`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Error retreiving user tracked stats!");
    };
  });
});

Router.post("/addnew", (req, res) => {
  console.log(req.body);
  const trackedStat = JSON.stringify(req.body);
  const gun = req.body.gun;
  const queryString = `SELECT stat_name FROM user_tracked_stats WHERE stat_name = '${gun}';`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      if (row.length < 1) {
        return res.send(addNewGun(trackedStat, gun))
      } else {
        console.log("We are already tracking this gun");
      }
      res.send(row);
    } else {
      console.log("Query Error", err);
    };
  });
});

Router.get("/trackedfavs", (req, res) => {
  const queryString = `SELECT * FROM user_tracked_stats WHERE user_id = 1;`; 
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Error retreiving user tracked stats!");
    };
  });
});

Router.post("/removestat", (req, res) => {
  queryString = `SELECT id FROM user_tracked_stats WHERE stat_name = '${req.body.gunName}';`;
  sqlConnection.query(queryString, (err, row, fields) => {
    if (!err) {
      removeStat(row[0].id)
      res.send("Test")
    } else {
      console.log("Error deleting from user tracked stats!");
    };
  });
});

module.exports = Router;