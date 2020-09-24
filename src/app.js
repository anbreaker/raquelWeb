'use strict';
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Initializations
const app = express();

// Conecto to Database
// require('./mongooseDatabase');

// Settings
app.set('port', process.env.PORT || 4000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));

// Form sends data, understand it, but not accept images etc...(Method of Express)
app.use(express.urlencoded({extended: false}));

// Config Express Data
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/routes'));

//  404 Handler Error
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Start the server on './index.js'

module.exports = app;
