import _ from 'lodash';
import fp from 'lodash/fp'
import { 
  swaggerTypeMap, 
  swaggerFormatMap,
  swaggerValidationMap,
  swaggerMethodMap,
  getFunctions,
} from './swaggerMap';

// Map over the values of the object and return the object with new values.
const mapProperties = fp.mapValues(value => ({
  type: swaggerTypeMap(value.type.key),
  format: swaggerFormatMap(value.type.key),
}));

export const mapDefinitions = fp.map(model => ({
  [model.tableName]: {
    properties: _.merge({}, mapProperties(model.tableAttributes)),
  }
}));

const mapPath = model => fp.compose(
  fp.map(key => ({
    [`/${model.tableName}/${key}`]: {
      // this needs a method to determine if it's a get/post etc
      [swaggerMethodMap(key)]: {
        "x-swagger-router-controller": model.tableName,
        "operationId": key,
        "tags": [model.tableName],
        responses: {
          "200": {
            "description": "Successful request.",
            "schema": {
              "$ref": `#/definitions/${model.tableName}`
            }
          },
          default: {
            "description": "Invalid Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
        }
      }
    },
  })),
  fp.keys,
  getFunctions,
)(model);


export const mapPaths = fp.flatMap(mapPath);

export default {
  mapPaths,
  mapDefinitions,
};
