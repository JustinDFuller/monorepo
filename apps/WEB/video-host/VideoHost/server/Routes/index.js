const appRoot = require('app-root-path');

const userController = require(`${appRoot}/server/Controllers/User`);
const authenticationController = require(`${appRoot}/server/Controllers/Authentication`);
const sessionController = require(`${appRoot}/server/Controllers/Session`);

module.exports = [
  {
    route: '/user/register',
    method: 'post',
    callback: userController.register,
  },
  {
    route: '/user/login',
    method: 'post',
    middleware: authenticationController.local,
    callback: userController.completeLogin,
  },
  {
    route: '/user/logout',
    method: 'post',
    callback: userController.logOut,
  },
  {
    route: '/user/data',
    method: 'get',
    middleware: sessionController.requireLogIn,
    callback: userController.getUserData,
  },
  {
    route: '/',
    method: 'get',
    callback: (req, res) => res.sendFile(`${appRoot}/client/index.html`),
  },
];
