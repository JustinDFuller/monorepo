const https = require('https');
const url = require('url');

const baseUrl = 'https://api.github.com';
const auth = `client_id=${process.env.CLIENT}&client_secret=${process.env.SECRET}`;
const headers = {
  headers: {
    'User-Agent': process.env.USER,
  },
};

function getRepoPromise (key, value) {
  return (resolve, reject) => getRepoBy(resolve, reject, key, value);
}

function getRepoBy (resolve, reject, key, value) {
  let link = `${baseUrl}/search/repositories?${auth}&sort=updated&order=desc&q=user:${process.env.USER}`;

  if (key && value) {
    link += `+${key}:${value}`;
  }

  console.log()

  const linkObj = url.parse(link);
  const reqObj = Object.assign(headers, linkObj);

  function handleRequest (response) {
    let data = '';
    response.on('data', (d) => {
      data += d;
    });

    response.on('end', () => {
      return resolve(JSON.parse(data));
    })
  }

  const request = https.request(reqObj, handleRequest);
  request.on('error', reject);
  return request.end();
}

module.exports = {
  getRepoByLanguage (language) {
    return new Promise(getRepoPromise('language', language));
  },
  getAllRepos () {
    return new Promise(getRepoPromise());
  },
};
