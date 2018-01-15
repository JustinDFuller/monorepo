const appRoot = require('app-root-path');
const _ = require('lodash');

const user = require(`${appRoot}/server/Models/User`);
const log = require(`${appRoot}/server/Util/log`);
const session = require('./Session');

function login(loginDetails = {}) {
  let retrievedUser = null;
  return new Promise(loginPromise);

  function loginPromise(resolve, reject) {
    return user.findByEmail(loginDetails.email)
      .then(checkPassword)
      .catch(reject);

    function checkPassword(res) {
      retrievedUser = res;
      return user.checkPassword(loginDetails.password, retrievedUser.password)
          .then(success => resolve(success ? retrievedUser : false));
    }
  }
}

function completeLogin(req, res) {
  return res.json({ isLoggedIn: session.isLoggedIn(req) });
}

function logOut(req, res) {
  req.logout();
  return res.json({ isLoggedIn: session.isLoggedIn(req) });
}

function register(request, response) {
  const userDetails = _.get(request, 'body', {});

  if (!validateUser(userDetails)) {
    return response.status(401).send('Invalid Email or Password.');
  }

  return user.findByEmail(user.email)
    .then(processFindResults(user, request, response))
    .catch(err => response.status(500).send(err));
}

function processFindResults(userDetails, request, response) {
  return res => {
    if (res) {
      return response.status(401).send('That email is already registered with an account.');
    }

    return user.encryptPassword(request.body.password)
        .then(result => createUser({ email: request.body.email, password: result }, request, response))
        .catch(err => {
          log.error('Error registering user', request.body, err);
          return response.status(500).send(err);
        });
  };
}

function createUser(userInfo, request, response) {
  return user.createUser(userInfo.email, userInfo.password)
    .then(res => response.send(res))
    .catch(err => {
      log.error(err);
      return response.status(500).send(err);
    });
}

function validateUser({ email, password }) {
  if (!email
      || !password
      || email.length > 250
      || password.length > 100
      || email.length < 5
      || password.length < 6) {
    return false;
  }

  return true;
}

function getUserData(request, response) {
  response.send('Get User Data');
}

module.exports = {
  register,
  login,
  completeLogin,
  logOut,
  getUserData,
};
