const express = require('express');
const path = require('path');
const routes = require(path.join(__dirname, '..', 'routes', 'routes.js'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', routes);


module.exports = app;