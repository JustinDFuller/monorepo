import _ from 'lodash';
import test from 'ava';
import sinon from 'sinon';
import routes from './routes';

test('It echoes a success message with a JSON response', async (t) => {
  const res = {
    json: sinon.spy(),
  };
  t.true(_.isFunction(routes().echo));
  await routes().echo(null, res);
  const response = res.json.getCall(0).args[0];
  t.true(res.json.called);
  t.is(response.message, 'This is an echo URL that confirms your connection.');
  t.true(response.success);
});

test('It catches errors, returns a 500 with an error message', async (t) => {
  const callback = {
    echo: () => {
      throw new Error('Testing error');
    },
  };
  const res = {
    status: sinon.stub(),
    json: sinon.spy(),
  };
  res.status.onCall(0).returns({ json: res.json });
  await routes(callback).echo(null, res);
  const response = res.json.getCall(0).args[0];
  t.true(res.json.called);
  t.true(res.status.calledWith(500));
  t.is(response.err, 'Testing error');
});
