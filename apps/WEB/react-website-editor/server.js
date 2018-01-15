const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require("webpack-dev-middleware");

app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: "/dist/",
}));

app.use(express.static('.dist'));
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
