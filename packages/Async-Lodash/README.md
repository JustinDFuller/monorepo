# Async-Lodash

This is a very simple wrapper around lodash. It has all the same methods (except chain as of v1.0.0).

Before invoking the lodash method it will resolve all promises that are in the arguments.

## Install

`npm i async-lodash -s`

## Why

Lodash is an amazing library, and it is a pretty standard one to include in most modern JavaScript applications. Promises are another amazing addition to the JS standard. When we put them together, life gets pretty easy. Up until now when you wanted to combine them, you might do something like this:

```javascript
import lodash from 'lodash';

// This async object could be a user event, an HTTP request, or any other async action. We'll mock it quickly here with Promise.resolve.
const asyncObject = Promise.resolve({
  user: {
    id: 4,
    name: 'Buddy',
  },
});

function getUser(asyncUser) {
  return new Promise(resolve => {
    return asyncUser.then(user => resolve(lodash.get(user, 'user.id')));
  });
}

getUser(asyncObject).then(console.log); // 4
```

Honestly, that's really not that bad... BUT I think it could be even easier. What if we could do something like?

```javascript
import lodash from 'lodash';

// This asynchronous object could be a user event, an HTTP request, or any other async action. We'll mock it quickly here with Promise.resolve.
const asyncObject = Promise.resolve({
  user: {
    id: 4,
    name: 'Buddy',
  },
});

function getUser(asyncUser) {
  return lodash.get(asyncUser, 'user.id');
}

getUser(asyncObject).then(console.log); // 4
```

The difference is small, but the benefit is huge. The dirty work of opening and resolving the promise has been taken care of! All you see is the lodash method, just like you would when working with synchronous data.

## Usage

```javascript
import _ from 'async-lodash';

const promise = Promise.resolve({ my: { test: 'value' }});

async function getMyTest(asyncValue) {
  const result = await _.get(asyncValue, 'my.test');
  console.log(result); // 'value'
}
```

```javascript
import _ from 'async-lodash';
import fetch from 'node-fetch';

function getObjectAsync() {
  return new Promise(resolve =>
    fetch('https://github.com/')
      .then(res => res.json())
      .then(resolve);
  });
}

function getMyTest(asyncValue) {
  _.get(getObjectAsync(), 'body.value')
   .then(console.log); // 'whatever property value was returned from fetch';
}
```

## Nested Methods

Often times when using Lodash, methods are nested within each other. This can still be done with Async-Lodash. Here's an example:

```javascript
import _ from 'async-lodash';

const data = [
  {
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

_.get(
  _.head(
    _.map(
      // Filter out all inactive users.
      _.filter(Promise.resolve(data), d => d.isActive),
      // Merge the object and return a new one with an info property
      d => Promise.resolve(
        asyncLodash.merge(Promise.resolve(d), { info: `${d.name} is an active user` })
      )
    ),
  ),
  'info',
).then(console.log); // "Billy is an active user"
```

The above example demonstrates that these async methods can be nested, and when promises are included they will still work.