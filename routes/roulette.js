const express = require("express");
const Router = express.Router();
const sqlConnection = require('../lib/db.js');
Router.use(express.json());

Router.get('/dropzone', (req, res) => {
    sqlConnection.query('SELECT * FROM drop_zones ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return;
    }
    console.log("Server Dropzone query: ", results);
    res.send(results);
  });
});

Router.get('/rules', (req, res) => {
  sqlConnection.query('SELECT * FROM special_rules ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return;
    }
    console.log("Server Rules query: ", results);
    res.send(results);
  });
});

Router.get('/primary', (req, res) => {
  sqlConnection.query('SELECT * FROM guns WHERE category in ("AR", "Sniper", "Light Machine Gun", "SMG") ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return;
    }
    console.log("Server Secondary query: ", results);
    res.send(results);
  });
});


Router.get('/secondary', (req, res) => {
  sqlConnection.query('SELECT * FROM guns WHERE category in ("Launchers", "Shotgun", "Melees", "Pistol") ORDER BY RAND() LIMIT 1;', (error, results) => {
    if (error) {
      return;
    }
    console.log("Server Secondary query: ", results);
    res.send(results);
  });
});

Router.get('/attachments', (req, res) => {
  sqlConnection.query('SELECT * FROM gun_attachments ORDER BY RAND() LIMIT 5;', (error, results) => {
    if (error) {
      return;
    }
    console.log("Server attachment query: ", results);
    res.send(results);
  });
});

module.exports = Router;