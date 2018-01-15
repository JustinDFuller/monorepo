const test = require('ava');
const index = require('./index');
const _ = require('lodash');
const sinon = require('sinon');

const responseApi = {
  send: sinon.spy(),
};

const requestApi = {
  body: sinon.spy(),
};

test('Routes provides an array of route objects.', (t) => {
  t.truthy(_.isArray(index));
});

test('Routes have a route, method, and callback', t => {
  index.forEach(route => {
    t.truthy(_.isString(route.route));
    t.truthy(_.isString(route.method));
    t.truthy(_.isFunction(route.callback));
    t.notThrows(() => route.callback(requestApi, responseApi));
  });
});
