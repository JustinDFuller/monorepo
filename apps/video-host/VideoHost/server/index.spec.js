const test = require('ava');
const index = require('./index');
const os = require('os');

test('Entry point returns an array based on amount of CPUs', (t) => {
  const cpus = os.cpus().length;
  const length = index.length;
  t.true(cpus === length);
  t.true(index[length - 1] === cpus - 1);
});
