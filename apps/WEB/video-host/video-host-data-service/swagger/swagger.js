import _ from 'lodash';
import { mapDefinitions, mapPaths, mapControllers } from './swaggerFileHelpers';
import { error } from './swaggerOptions';

export default models => ({
  "swagger": "2.0",
  "info": {
    "title": "Video Host Data Service",
    "description": "API for getting video host data.",
    "version": "1.0"
  },
  "produces": ["application/json"],
  "host": "localhost:3000",
  "basePath": "/api",
  "paths": _.merge({}, ...mapPaths(models)),
  "definitions": _.merge({ Error: error }, ...mapDefinitions(models)),
});
