const express = require('express')
const mysql = require('mysql');
const app = express()
const path = require('path')
require('dotenv').config();

app.disable("x-powered-by");

// Import Middleware
const logger = require('./middleware/logger')
app.use(logger)
const connection = require('./middleware/db_connect');

// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/app1', (req, res) => {
  res.send('Hello this Apps 1!')
});

app.get('/app2', (req, res) => {
  res.send('Hello this App 2!')
});

app.get('/hari', (req, res) => {
  res.send('Hello, its me!')
});

app.get('/users', (req, res, next) => {
  const sql = "SELECT * FROM tb_data ORDER BY id DESC";
  connection.query(sql, (error, results) => {
    if (error) {
      // If there's an error, pass it to the next middleware or send an error response
      return next(error); // Or res.status(500).send('Database query failed');
    }
    // Send the result to the client
    res.send(results);
  });
});


app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})

module.exports = app