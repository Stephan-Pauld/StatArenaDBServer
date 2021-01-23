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

  const queryString = `
  SELECT a.type,
  (SELECT b.name FROM gun_attachments AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name 
  FROM gun_attachments AS a GROUP BY a.type ORDER BY RAND() LIMIT 5;`;
  // SELECT a.type,
  // (SELECT b.name FROM gun_attachments AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name,
  // (SELECT c.image FROM gun_attachments AS c WHERE c.id = (SELECT d.id FROM gun_attachments AS d WHERE d.type=a.type LIMIT 1) ORDER BY RAND() LIMIT 1) AS attachment_image 
  // FROM gun_attachments AS a GROUP BY a.type ORDER BY RAND() LIMIT 5;`;
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    console.log("Server attachment query: ", results);
    res.send(results);
  });
});

Router.get('/tactical', (req, res) => {

  const queryString = `
  SELECT a.type,
  (SELECT b.name FROM tactical_lethal AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name
  FROM tactical_lethal AS a GROUP BY a.type ORDER BY RAND() LIMIT 2;`;
  // SELECT a.type,
  // (SELECT b.name FROM tactical_lethal AS b WHERE a.type = b.type ORDER BY RAND() LIMIT 1) AS attachment_name,
  // (SELECT c.image FROM tactical_lethal AS c WHERE c.id = (SELECT d.id FROM tactical_lethal AS d WHERE d.type=a.type LIMIT 1) ORDER BY RAND() LIMIT 1) AS attachment_image 
  // FROM tactical_lethal AS a GROUP BY a.type ORDER BY RAND() LIMIT 2;`;
  sqlConnection.query(queryString, (error, results) => {
    if (error) {
      return;
    }
    console.log("Server tactical/lethal query: ", results);
    res.send(results);
  });
});

module.exports = Router;


