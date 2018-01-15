const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/myproject';

const actions = {
  createPostcollection(err, db) {
    const $or = [
      { title: { $type: 'string' } },
      { article: { $type: 'string' } },
      { opposingArticle: { $type: 'string' } },
    ];
    const validations = {
      validator: {
        $or,
      },
    };
    db.createCollection('post', validations);
  },
  getCollection(resolve, reject) {
    function connect(err, db) {
      if (err) {
        return reject('Error while connecting to mongodb client.', err);
      }

      return resolve(db.collection('documents'));
    }

    MongoClient.connect(url, connect);
  },
};

function database() {
  return new Promise(actions.getCollection);
}

module.exports = database;
