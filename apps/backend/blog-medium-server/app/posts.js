const https = require('https');
const xml = require('xml2js');
const parser = new xml.Parser();
let posts = null;
let updated = null;
let updating = false;

function getPosts () {
  return new Promise(getPostsPromise);
}

function getPostsPromise (resolve, reject) {
  if (posts) {
    resolve(posts);

    if (!needsToBeUpdated() || updating) {
      return;
    }
  }

  updating = true;

  https.get('https://medium.com/feed/@justindanielfuller', getData)
    .on('error', console.error);

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
      if (!posts) {
        resolve(result.rss.channel[0].item);
      }
      updated = new Date().getMinutes();
      posts = result.rss.channel[0].item;
      updating = false;
    }
  }
}

// It needs to be updated at most once per hour.
function needsToBeUpdated () {
  return new Date().getMinutes() - updated >= 60;
}

module.exports = getPosts;
