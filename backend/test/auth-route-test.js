'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

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
    describe('with valid input', () => {
      it('should return a status code of 200, and the user\'s information', (done) => {
        request.post(`${url}/api/signup`)
          .send(testUser)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            // expect(res.text).to.be.a('string');
            console.log(res.text);
            console.log(res.body);
            done();
          });
      });
      it('should fail', () => {
        expect().to.equal(10);
      });
    });
  });
});
