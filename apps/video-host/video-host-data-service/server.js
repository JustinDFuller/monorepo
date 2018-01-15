import _ from 'lodash';
import path from 'path';
import fp from 'lodash/fp';
import express from 'express';
import swaggerTools from 'swagger-tools';
import { getModels } from './db/sequelize';
import { options } from './swagger/swaggerOptions';
import swaggerDoc from './swagger/swagger';

const app = express();

const startup = fp.curry((optionsWithControllers, middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());
  app.use(express.static('coverage'));
  app.get('/coverage', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'coverage/index.html'));
  });
  app.get('/', (req, res) => res.redirect('/docs'));
  app.listen(process.env.PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', process.env.PORT, process.env.PORT);
  });
});

const getOptionsWithControllers = (models) => {
  
}

function initWithModels(models) {
  swaggerTools.initializeMiddleware(swaggerDoc(models), startup(getOptionsWithControllers));
}

function initialize() {
  function handleError(error) {
    console.error(error);
    console.log('App startup error, trying again in 10 seconds.');
    setTimeout(initialize, 10000);
  }
  
  try {
    getModels().then(initWithModels).catch(handleError);
  } catch(e) {
    handleError(e);
  }
}

initialize();
