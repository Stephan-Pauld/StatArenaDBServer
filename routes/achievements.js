const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');


Router.get("/", (req, res) => {
  sqlConnection.query("SELECT * FROM achievements", (err, row, fields) => {
    if (!err) {
      res.send(row)
    } else {
      console.log("Query Error");
    }
  })
})

module.exports = Router
