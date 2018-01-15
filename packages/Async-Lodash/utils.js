const lodash = require('lodash');

function promisify(originalFunction) {
    return function execution(...args) {
        return new Promise(resolve => {
            const resolveOriginal = lodash.flow(lodash.spread(originalFunction), resolve);
            return Promise.all(args).then(resolveOriginal);
        });
    }
}

module.exports = {
    promisify,
}