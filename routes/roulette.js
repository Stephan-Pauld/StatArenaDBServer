const express = require("express");
const Router = express.Router();
const sqlConnection = require("../lib/db.js");
Router.use(express.json());

Router.get("/dropzone", (req, res) => {
  const queryString = "SELECT * FROM drop_zones ORDER BY RAND() LIMIT 1;";
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

Router.get("/rules", (req, res) => {
  const queryString = "SELECT * FROM special_rules ORDER BY RAND() LIMIT 1;";
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

Router.get("/primary", (req, res) => {
  const queryString =
    'SELECT * FROM guns WHERE category in ("AR", "Sniper", "Light Machine Gun", "SMG") ORDER BY RAND() LIMIT 1;';
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

Router.get("/secondary", (req, res) => {
  const queryString =
    'SELECT * FROM guns WHERE category in ("Launchers", "Shotgun", "Melees", "Pistol") ORDER BY RAND() LIMIT 1;';
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

Router.get("/attachments", (req, res) => {
  const queryString = `
  SELECT a.type,
  (SELECT b.name FROM gun_attachments AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name 
  FROM gun_attachments AS a GROUP BY a.type ORDER BY RAND() LIMIT 5;`;

  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

Router.get("/tactical", (req, res) => {
  const queryString = `
  SELECT a.type,
  (SELECT b.name FROM tactical_lethal AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name
  FROM tactical_lethal AS a GROUP BY a.type ORDER BY RAND() LIMIT 2;`;

  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    res.send(results);
  });
});

module.exports = Router;
