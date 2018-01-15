const test = require('ava');
const index = require('./index');
const _ = require('lodash');
const sinon = require('sinon');

test.before(() => {
  sinon.spy(index, 'processLog');
});

test.afterEach(() => {
  index.processLog.reset();
});

test('Index is a function that logs things.', (t) => {
  t.true(_.isFunction(index));
  t.true(_.isFunction(index.log));
  t.true(_.isFunction(index.info));
  t.true(_.isFunction(index.warn));
  t.true(_.isFunction(index.error));
  t.true(_.isFunction(index.processLog));
});

test('Logs do not fail with no arguments', t => {
  const Index = index;
  t.notThrows(() => new Index());
  t.notThrows(index.log);
  t.notThrows(index.info);
  t.notThrows(index.warn);
  t.notThrows(index.error);
  t.notThrows(index.processLog);
});

test('Log calls processLog with log and arguments', t => {
  const testArgs = 'LOG ARGUMENTS';
  index.log(testArgs);
  t.true(index.processLog.called);
  t.true(index.processLog.calledWith('log', testArgs));
});

test('info calls processLog with info and arguments', t => {
  const testArgs = 'info ARGUMENTS';
  index.info(testArgs);
  t.true(index.processLog.called);
  t.true(index.processLog.calledWith('info', testArgs));
});

test('warn calls processLog with warn and arguments', t => {
  const testArgs = 'warn ARGUMENTS';
  index.warn(testArgs);
  t.true(index.processLog.called);
  t.true(index.processLog.calledWith('warn', testArgs));
});

test('error calls processLog with error and arguments', t => {
  const testArgs = 'error ARGUMENTS';
  index.error(testArgs);
  t.true(index.processLog.called);
  t.true(index.processLog.calledWith('error', testArgs));
});

test('It logs to console in development.', t => {
  process.env.NODE_ENV = 'development';
  const res = index.processLog('log', 'Testing development logging.');
  t.true(res);
});
