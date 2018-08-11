'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const passingError = Error('test case passing unexpectedly');

const testUser = {
  username: 'test user',
  password: '123',
  email: 'testuser@test.com'
};

const newUser = {
  username: 'new user',
  password: '321',
  email: 'newuser@new.com'
};

describe('auth-route-test.js', function(){
  describe('POST: /api/signup', () => {
    afterEach((done) => {
      User.remove({username: 'test user'})
        .then(() => done())
        .catch(done);
    });

    describe('with valid input', () => {
      it('should return a status code of 200, and a jsonwebtoken', (done) => {
        request.post(`${url}/api/signup`)
          .send(testUser)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('string');
            done();
          });
      });
    });

    describe('with missing information', () => {
      it('should return a status code of 400', (done) => {
        let tempUser = testUser;
        delete tempUser.username;
        request.post(`${url}/api/signup`)
          .send(tempUser)
          .end((err) => {
            expect(err.status).to.equal(400);
            done();
          });
      });
    });

    // describe('with invaid data type', (done) => {
    //   let tempUser = testUser;
    //   tempUser.username = {};
    //   request.post(`${url}/api/signup`)
    //     .send(tempUser)
    //     .end((err) => {
    //       console.log(err);
    //       done();
    //     });
    // });
  });

  describe('GET: /api/login', function(){
    beforeEach((done) => {
      request.post(`${url}/api/signup`)
        .send(testUser)
        .then(() => done())
        .catch(done);
    });

    afterEach((done) => {
      User.remove({username: 'test user'})
        .then(() => done())
        .catch(done);
    });

    describe('with valid input', () => {
      it('should return a status code of 200, and the user\'s information', (done) => {
        request.get(`${url}/api/login`)
          .auth(testUser.username, testUser.password)
          .end((err, res) => {
            if(err) return done(err);
            console.log(res);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
