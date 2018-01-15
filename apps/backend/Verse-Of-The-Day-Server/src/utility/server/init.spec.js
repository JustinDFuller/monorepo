import test from 'ava';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const helmet = sinon.spy();
const compression = sinon.spy();
let expressMock = null;
let init = null;

test.beforeEach(() => {
  expressMock = {
    use: sinon.spy(),
    all: sinon.spy(),
    listen: sinon.spy(),
    get: sinon.spy(),
  };
  init = proxyquire('./init', {
    express: () => expressMock,
    helmet,
    compression,
  });
});

test('Make sure all the different deps are used. No logic tests just integration.', (t) => {
  t.false(expressMock.listen.called);
  t.false(helmet.called);
  t.false(compression.called);
  init();
  t.truthy(expressMock.listen.called);
  t.truthy(helmet.called);
  t.truthy(compression.called);
});

test('It makes a GET request with dailyVerse', (t) => {
  t.false(expressMock.get.called);
  init();
  t.true(expressMock.get.calledWith('/dailyVerse'));
});
