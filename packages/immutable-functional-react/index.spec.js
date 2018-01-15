import test from 'ava';
import index, { render, createElement } from './index';

test('It exports an object', (t) => {
    t.true(typeof index === 'object');
});

test('It exports a render method', (t) => {
    t.true(typeof index.render === 'function');
    t.true(typeof render === 'function');
});

test('It exports a createElement method', (t) => {
    t.true(typeof index.createElement === 'function');
    t.true(typeof createElement === 'function');
});