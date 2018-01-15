import Sequelize from 'sequelize';
import _ from 'lodash';
import fp from 'lodash/fp';
import models from './models';

const connection = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect:  process.env.DB_TYPE,
  protocol: process.env.DB_TYPE,
  native: true,
  ssl: true,
});

async function defineModel(value, key) {
  const model = connection.define(key, value.define(Sequelize));
  await model.sync();
  console.log(`Defined and synced model ${key}`);
  return model;
}

export function getModels() {
  return connection
    .authenticate()
    .then(() => Promise.all(_.map(models, defineModel)))
    .catch(err => console.error('Unable to connect to the database:', err.message));
}

export default {
  getModels,
};
