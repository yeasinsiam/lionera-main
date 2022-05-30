'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Creating the express app
const app = express();

// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// Parsing JSON, Form-Data and Cookies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Static Directory 
app.use('/files', express.static(path.join(__dirname, 'public/storage/files')))

// Sanitizing user data
app.use(expressMongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Testing a route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register the routers
app.use('/api/v1', router);

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
