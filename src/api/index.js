/**
 * Application Main file
 */
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

const { NOT_FOUND } = require('./util/error');
const { handleSuccessResponse, OK } = require('./util/success');

const app = express();

dotenv.config();

/**
 * Set up middleware
 */
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) =>
  res.status(OK).json(
    handleSuccessResponse({
      message: 'Welcome to API root...',
      data: [],
    }),
  ),
);

// Handle invalid request
app.all('*', (req, res) =>
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Route does not exist...',
    body: [],
  }),
);

// handle all application error
// eslint-disable-next-line max-len
// app.use(allErrorHandler());

module.exports = app;
