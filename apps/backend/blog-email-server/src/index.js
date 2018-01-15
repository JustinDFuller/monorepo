require('dotenv').config();

const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const email = require('./email');
const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.options('*', (req, res) => {
  getAllowedOrigin(req, res);
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.send();
})

app.post('/', (req, res) => {
  getAllowedOrigin(req, res);
  return email(req.body.subject, req.body.text)
    .then((result) => res.json(result))
    .catch((result) => res.status(500).json(result));
});

app.listen(process.env.PORT, function () {
  console.log(`Blog listening on port ${process.env.PORT}`);
});

function getAllowedOrigin (req, res) {
  const origin = req.headers.origin;
  if (config.allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
}
