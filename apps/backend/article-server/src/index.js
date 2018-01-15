const getCollection = require('./database/database');

const actions = {
  insertOne (collection) {
    collection.insertOne({ title: 'test' }, logResult)
  },
  getAll (collection) {
    return collection.find({}).toArray(logResult);
  }
}

function logResult (err, result) {
  if (err) {
    return console.error('Error: ', err);
  }
  console.log('Result: ', result);
}

getCollection().then(actions.getAll);
