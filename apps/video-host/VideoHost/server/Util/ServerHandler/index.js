const express = require('express');
const helmet = require('helmet');
const _ = require('lodash');
const appRoot = require('app-root-path');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const log = require(`${appRoot}/server/Util/log`);
const csp = require('./contentSecurityPolicy');

const server = express();
const port = process.env.PORT || 8080;

function startServer(routes) {
  evaluateRoutes(routes);
  server.use(helmet());
  server.use(helmet.contentSecurityPolicy(csp));
  server.use(compression());
  server.use(bodyParser.json());
  server.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use('/scripts', express.static(`${appRoot}/client/dist/scripts`));
  createRoutes(routes);
  server.use(handle404);
  server.listen(port, announceListen);
  return server;
}

function createRoutes(routes) {
  return routes.map(createRoute);
}

function createRoute(route = {}) {
  const serverMethod = server[route.method];

  if (!serverMethod || !_.isFunction(serverMethod)) {
    throw new TypeError(`Incorrect method received, used ${route.method} for ${route.route}.`);
  }

  if (route.middleware && _.isFunction(route.middleware)) {
    return server[route.method](route.route, route.middleware, route.callback);
  }

  return server[route.method](route.route, route.callback);
}

function announceListen() {
  log.log(`Cluster listening on port ${port}!`);
}

function evaluateRoutes(routes) {
  if (!routes || !routes.length) {
    throw new RangeError('There must be at least one or more routes to start the server.');
  }
}

function handle404(request, response) {
  return response.status(404).send('This page could not be found!');
}

module.exports = startServer;
