const lodash = require('lodash');
const {
    promisify,
} = require('./utils');

const keys = Object.keys(lodash);

function promisifyMethods(keys, methods = {}) {
    if (!keys || !keys.length) {
        return methods;
    }
    const newMethods = lodash.merge({}, methods);
    newMethods[keys[0]] = promisify(lodash[keys[0]]);
    return promisifyMethods(keys.slice(1), newMethods);
}

const asyncLodash = Object.freeze(promisifyMethods(keys));

module.exports = asyncLodash;