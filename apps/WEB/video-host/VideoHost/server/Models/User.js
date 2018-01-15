const appRoot = require('app-root-path');
const bcrypt = require('bcrypt');

const log = require(`${appRoot}/server/Util/log`);
const query = require(`${appRoot}/server/Util/DatabaseHandler`).runQuery;

const saltRounds = 10;

function checkPassword(password, hash) {
  return new Promise(comparePasswordAndHash);

  function comparePasswordAndHash(resolve, reject) {
    return bcrypt.compare(password, hash)
        .then(completeCheck)
        .catch(err => completeCheck(null, err));

    function completeCheck(isCorrect, error) {
      if (error) {
        log.error('Error generating password hash', error, hash, password);
        return reject(error);
      }

      return resolve(isCorrect);
    }
  }
}

function encryptPassword(password) {
  return new Promise(encryptPromise);

  function encryptPromise(resolve, reject) {
    return bcrypt.hash(password, saltRounds)
      .then(completeEncryption)
      .catch(err => completeEncryption(null, err));

    function completeEncryption(hash, error) {
      if (error) {
        log.error('Error generating password hash', error, hash, password);
        return reject(error);
      }

      return resolve(hash);
    }
  }
}

function findByEmail(email) {
  return new Promise((resolve, reject) =>
    query('SELECT id, email, password FROM users WHERE email=$1', [email])
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(err)));
}

function findById(id) {
  return new Promise((resolve, reject) =>
    query('SELECT id, email, password FROM users WHERE id=$1', [id])
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(err)));
}

function createUser(email, password) {
  return new Promise((resolve, reject) =>
    query('INSERT INTO users (email, password) VALUES ($1::text, $2::text)', [email, password])
      .then(res => resolve(res))
      .catch(err => reject(err)));
}

module.exports = {
  checkPassword,
  encryptPassword,
  findByEmail,
  findById,
  createUser,
};
