'use strict';

const https = require('https');
const xml = require('xml2js');
const parser = new xml.Parser();

const getPostsPromise = () => new Promise(getPosts);

function getPosts(resolve, reject) {
  https.get('https://medium.com/feed/@justindanielfuller', getData)
    .on('error', reject);

  function getData (res) {
    let data = '';
    res.on('data', addToData);
    res.on('end', parseData);

    function addToData (d) {
      data += d;
    }

    function parseData () {
      parser.parseString(data, handleParseResult);
    }

    function handleParseResult (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result.rss.channel[0].item);
    }
  }
}

module.exports.posts = (event, context, callback) => getPostsPromise()
  .then(res => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
      },
      body: JSON.stringify(res)
    };
    callback(null, response);
  })
  .catch(callback);
