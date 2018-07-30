'use strict';

const debug = require('debug')('credibleEdibles:user');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Promise = require('bluebird');
const faker = require('faker');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true },
});

userSchema.methods.generatePasswordHash = function(password){
  debug('generate-password-hash');
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password){
  debug('compare-password-hash');
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid) return reject(createError(401, 'unauthorized'));
      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function(){
  debug('generate-find-hash');
  return new Promise((resolve, reject) => {
    this.findHash = crypto.randomBytes(32).toString('hex');
    this.save()
      .then(() => resolve(this.findHash))
      .catch((err) => reject(err));
  });
};

userSchema.methods.generateToken = function(){
  debug('generate-token');
  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then((findHash) => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
      .catch((err) => reject(err));
  });
};

debug('user-schema');

const User = module.exports = mongoose.model('users', userSchema);

User.handleOAUTH = function(data) {
  if(!data || !data.email){
    return Promise.reject(createError(400, 'VALIDATION ERROR - missing login info'));
  }

  return User.findOne({email: data.email})
    .then((user) => {
      console.log('%%%%%%%%%%%%%%%%%%', user);
      if(!user) {
        throw new Error('not found - create a user');
      }
      return user;
    })
    .catch(() => {
      console.log('___DATA___', data);
      return new User({
        username: faker.internet.userName(),
        email: data.email
      }).save();
    });
};
