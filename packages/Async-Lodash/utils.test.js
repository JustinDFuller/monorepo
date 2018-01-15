'use strict';

const assert = require('assert');
const utils = require('./utils.js');

function testingPromisify(value, rest) {
    assert(value === 'this should be the value', 'Should contain the resolved promise value');
    assert(rest === 'this should be the rest', 'Shoudl contain any non-promise values.');
    return 'async-response';
}

const testPromise = new Promise(resolve => resolve('this should be the value'));

const promisified = utils.promisify(testingPromisify);

promisified(testPromise, 'this should be the rest').then(response => {
    assert(response === 'async-response', 'Async response should be sent.');
});