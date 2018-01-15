require('dotenv').config();
const cache = require('apicache').middleware;
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const app = express();

const github = require('./github');
const config = require('./config');

app.use(compression());
app.use(helmet());

app.get('/repos/bylanguage', cache('1 hour'), (req, res) => {
  getAllowedOrigin(req, res);
  return github.getRepoByLanguage(req.query.language)
    .then(data => res.json(data))
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Unable to get requested resource.'})
    });
});

app.get('/repos', cache('1 hour'), (req, res) => {
  getAllowedOrigin(req, res);
  return github.getAllRepos()
    .then(data => res.json(data))
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Unable to get requested resource.'})
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Blog listening on port ${process.env.PORT || 3000}`);
});

function getAllowedOrigin (req, res) {
  const origin = req.headers.origin;
  if (config.allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
}
