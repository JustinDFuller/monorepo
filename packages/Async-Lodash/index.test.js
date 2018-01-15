'use strict';

const assert = require('assert');
const asyncLodash = require('./index.js');

const testObject = {
    key: 'value',
    numeric: 0,
};

asyncLodash.get(testObject, 'key').then(result => assert(result === 'value'));
asyncLodash.get(Promise.resolve(testObject), 'key').then(result => assert(result === 'value'));

asyncLodash.clamp(asyncLodash.get(Promise.resolve(testObject), 'numeric'), 4, 10)
    .then(result => assert(result === 4));

const data = [{
        id: 5,
        name: 'Tom',
        isActive: false,
    },
    {
        id: 23,
        name: 'Billy',
        isActive: true,
    },
];

asyncLodash.get(
    asyncLodash.head(
        asyncLodash.map(
            asyncLodash.filter(Promise.resolve(data), d => d.isActive),
            d => Promise.resolve(
                asyncLodash.merge(Promise.resolve(d), { info: `${d.name} is an active user!` })
            )
        )
    ),
    'info'
).then(res => assert(res === 'Billy is an active user!'));

// Would eventually like to get chain working.
// asyncLodash.chain(testObject).get('key').value().then(result => assert(result === 'value'));