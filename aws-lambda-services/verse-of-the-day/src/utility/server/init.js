import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import server from './server';
import routes from './../routes/routes';

function init() {
  const app = express();
  app.use(compression());
  app.use(helmet());
  app.use(server.getAllowedOrigin);
  // This should be refactored to a less verbose option.
  const routeMethods = routes();
  app.all('/echo', routeMethods.echo);
  app.get('/dailyVerse/:version', routeMethods.dailyVerse);
  app.get('/dailyVerse', routeMethods.dailyVerse);
  app.get('/proverb/:version', routeMethods.proverb);
  app.get('/proverb', routeMethods.proverb);
  app.get('/psalm/:version', routeMethods.psalm);
  app.get('/psalm', routeMethods.psalm);
  app.get('/random/:version', routeMethods.random);
  app.get('/random', routeMethods.random);
  app.get('/versions', routeMethods.versions);
  app.listen(process.env.PORT || 3000, server.listen);
}

module.exports = init;
