const test = require('ava');
const _ = require('lodash');
const sinon = require('sinon');
const mock = require('mock-require');

mock('cluster', {
  isMaster: true,
  fork: sinon.spy(),
  on: sinon.spy(),
});

const clusterHandler = require('./index');

test('Clusterhandler sends a function to start the clusters', (t) => {
  t.truthy(_.isObject(clusterHandler));
  t.truthy(_.isFunction(clusterHandler));
});

test('Clusterhandler throws an error if callback is not a function', (t) => {
  t.throws(clusterHandler.createClusters, 'ClusterHandler callback must be a function.');
});

test('ClusterHandler calls the callback function', (t) => {
  const callback = sinon.spy();
  t.truthy(_.isFunction(callback));
  t.notThrows(() => clusterHandler.createClusters(false, callback));
  t.truthy(callback.calledOnce);
});

test('Clusterhandler logs when a fork dies', (t) => {
  t.notThrows(clusterHandler.endCluster);
});
