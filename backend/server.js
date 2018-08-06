'use strict';

const debug = require('debug')('moch-facebook:server');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

mongoose.Promise = require('bluebird');

const errors = require('./lib/error-middleware.js');
const authRoutes = require('./route/auth-route.js');

dotenv.load();

const app = express();
// setting port to 8000 because 3000 is reserved for the frontend
// NOTE: process.env needs to be removed for the final verson
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI);

// app.use(cors({
//   origin: process.env.CORS_ORIGINS.split(' '),
//   credentials: true
// }));

app.use(morgan('dev'));

app.listen(PORT, () => debug(`backend running on PORT: ${PORT}`));
