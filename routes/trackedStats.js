const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');

const addNewGun = (trackedStat, gun) => {
  sqlConnection.query(`INSERT INTO tracked_stats (user_id, tracked, stat_name) VALUES(1, '${trackedStat}', '${gun}')`, (err, row, fields) => {
    if (!err) {

      // res.send(row)
    } else {
      console.log("Query Error", err);
    }
  })
}

const removeStat = (id) => {
  sqlConnection.query(`DELETE FROM tracked_stats WHERE id = ${id}`, (err, row, fields) => {
    if (!err) {
      console.log(row);
      return row
    } else {
      console.log("Query Error");
      return
    }
  })
}

Router.get("/", (req, res) => {
  sqlConnection.query("SELECT * FROM tracked_stats", (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Query Error");
    }
  })
})

Router.post("/addnew", (req, res) => {
  console.log(req.body);
  const trackedStat = JSON.stringify(req.body);
  const gun = req.body.gun

  sqlConnection.query(`SELECT stat_name FROM tracked_stats WHERE stat_name = '${gun}'`, (err, row, fields) => {
    if (!err) {
      if (row.length < 1) {
        console.log("tracking new G");
        return res.send(addNewGun(trackedStat, gun))
      } else {
        console.log("We are already tracking this gun");
      }
      res.send(row)
    } else {
      console.log("Query Error", err);
    }
  })
})

Router.get("/trackedfavs", (req, res) => {
  sqlConnection.query("SELECT * FROM tracked_stats WHERE user_id = 1", (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Query Error");
    }
  })
})

Router.post("/removestat", (req, res) => {

  sqlConnection.query(`SELECT id FROM tracked_stats WHERE stat_name = '${req.body.gunName}'`, (err, row, fields) => {
    if (!err) {
      removeStat(row[0].id)
      console.log("FINISHED");
      res.send("Test")
    } else {
      console.log("Query Error");
    }
  })

})

module.exports = Router