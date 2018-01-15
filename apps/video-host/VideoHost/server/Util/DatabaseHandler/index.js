const pg = require('pg');
const appRoot = require('app-root-path');

const log = require(`${appRoot}/server/Util/log`);
const config = require('./config');

let pools = 0;
const pool = new pg.Pool(config);
pool.on('error', poolError);
pool.on('connect', poolConnect);

function poolError(error) {
  log.error('idle client error', error.message, error.stack);
}

function poolConnect() {
  pools++;

  if (pools > config.max) {
    log.warning(`There are currently ${pools} pools. There should only be ${config.max}.`);
  }
}

function runQuery(queryString, queryParams) {
  return new Promise(queryPromise);

  function queryPromise(resolve, reject) {
    return pool.query(queryString, queryParams)
      .then(res => resolve(res))
      .catch(err => reject(err));
  }
}

module.exports = {
  runQuery,
};
