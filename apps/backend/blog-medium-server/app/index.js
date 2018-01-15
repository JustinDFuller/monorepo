const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const app = express();
const posts = require('./posts');
const config = require('./config');
const cache = require('apicache').middleware;

app.use(compression());
app.use(helmet());

app.get('/', (req, res) => {
  getAllowedOrigin(req, res);
  posts().then(posts => res.json(posts)).catch(console.error)
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
