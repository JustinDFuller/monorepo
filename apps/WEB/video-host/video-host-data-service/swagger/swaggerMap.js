import _ from 'lodash';
import fp from 'lodash/fp';

export function swaggerTypeMap(type) {
  const map = {
    char: 'string',
    text: 'string',
    bigint: 'integer',
    float: 'number',
    double: 'number',
    decimal: 'number',
    real: 'number',
    blob: 'string',
    enum: 'array',
    date: 'string',
    dateonly: 'string',
    time: 'string',
    now: 'string',
    uuid: 'string',
    uuidv1: 'string',
    uuidv4: 'string',
    json: 'string',
    /** 
     * Missing implementations
     * Virtual, Geography, Geometry, Range, JsonB, Hstore
     */
  };
  return _.lowerCase(map[_.lowerCase(type)] || type);
}

export function swaggerFormatMap(type) {
  const map = {
    integer: 'int32',
    bigint: 'int64',
    float: 'float',
    double: 'double',
    byte: 'byte',
    binary: 'binary',
    date: 'date',
    datetime: 'date-time',
    password: 'password',
  };
  return _.lowerCase(map[_.lowerCase(type)] || type);
}

export function swaggerValidationMap(key, value) {
  const map = {
    len: {
      minLength: _.head(value),
      maxLength: _.last(value),
    },
  };
  return _.lowerCase(map[_.lowerCase(key)]);
}

/**
 * Alphabetically sorted functions, this is the order they will show in the UI.
 * .sort() is called in case one is added out of order on accident.
 */
const functions = [
  'all',
  'count',
  'create',
  'destroy',
  'find',
  'findAll',
  'findAndCountAll',
  'findById',
  'findByPrimary',
  'findCreateFind',
  'findOne',
  'findOrCreate',
  'findOrInitialize',
  'increment',
  'insertOrUpdate',
  'max',
  'min',
  'sum',
  'upsert'
].sort();

export const getFunctions = fp.pick(functions);

export function swaggerMethodMap(method) {
  switch(method) {
    case 'findOrCreate':
    case 'findOrInitialize':
    case 'create':
    case 'findCreateFind':
      return 'post';
    case 'upsert':
    case 'increment':
    case 'insertOrUpdate':
      return 'put';
    case 'destroy': 
      return 'delete';
    default:
      return 'get';
  }
}

export default {
  swaggerTypeMap,
  swaggerFormatMap,
  swaggerValidationMap,
  getFunctions,
};
