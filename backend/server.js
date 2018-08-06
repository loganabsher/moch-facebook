'use strict';

const debug = require('debug')('moch-facebook:server');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.Promise = require('bluebird');
