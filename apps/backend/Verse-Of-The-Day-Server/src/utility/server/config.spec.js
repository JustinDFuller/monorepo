import test from 'ava';
import config from './config';

test('It should be an array', (t) => {
  t.true(Array.isArray(config.allowedOrigins));
});

test('It allows headers from config', (t) => {
  config.allowedOrigins.forEach((origin) => {
    t.true(typeof origin === 'string');
  });
});

test('There should be at least one allowed origin', (t) => {
  t.truthy(config.allowedOrigins.length);
});
