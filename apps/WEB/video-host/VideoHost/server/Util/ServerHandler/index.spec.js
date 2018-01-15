const test = require('ava');
const mock = require('mock-require');
const sinon = require('sinon');
const _ = require('lodash');
const appRoot = require('app-root-path');

const expressMock = () => ({
  use: sinon.spy(),
  listen: sinon.stub().callsArg(1),
  get: sinon.spy(),
  post: sinon.spy(),
});

const helmetMock = sinon.spy();
helmetMock.contentSecurityPolicy = sinon.spy();

const logMock = sinon.spy();
logMock.log = sinon.spy();

const compressionMock = sinon.spy();
const bodyParserMock = {
  json: sinon.spy(),
};

/**
 * Mock first so that it takes effect before index.js is retrieved.
 */
mock('express', sinon.spy(expressMock));
mock('helmet', helmetMock);
mock('compression', compressionMock);
mock('body-parser', bodyParserMock);
mock(`${appRoot}/server/Util/log`, logMock);

const index = require('./index');
const csp = require('./contentSecurityPolicy');

test('Server provides a function that starts an express server', (t) => {
  t.truthy(_.isFunction(index));
});

test('Server start method returns the server it creates', (t) => {
  const server = index([{ method: 'get' }]);
  t.truthy(_.isObject(server));
  // Just check that basic server functions exist.
  t.truthy(_.isFunction(server.use));
  t.truthy(_.isFunction(server.get));
  t.truthy(_.isFunction(server.post));
});

test('The server uses helmet for security.', (t) => {
  index([{ method: 'get' }]);
  t.truthy(helmetMock.called);
  t.truthy(helmetMock.contentSecurityPolicy.called);
  t.truthy(helmetMock.contentSecurityPolicy.calledWith(csp));
});

test('The server throws errors if incorrect methods are used', t => {
  const erroredIndex = () => index([{ method: 'fake!', route: 'test' }]);
  const expected = 'Incorrect method received, used fake! for test.';
  t.throws(erroredIndex, expected);
});

test('The server logs that it will be starting', t => {
  index([{ method: 'get' }]);
  t.truthy(logMock.log.called);
  t.truthy(logMock.log.calledWith(`Cluster listening on port ${process.env.PORT || 8080}!`));
});

test('The server throws an error when called without any routes.', t => {
  t.throws(index, 'There must be at least one or more routes to start the server.');
  const incorrectRoutes = [undefined];
  t.throws(() => index(incorrectRoutes), 'Incorrect method received, used undefined for undefined.');
});

test('The server uses compression', t => {
  t.true(compressionMock.called);
});

test('The server uses bodyparser', t => {
  t.true(bodyParserMock.json.called);
});

/**
 * This may not be necessary.
 */
test.after.always(() => {
  mock.stopAll();
});
