import 'babel-polyfill';
import _ from 'lodash';
import Promise, { promisify } from 'bluebird';
import request from 'request-promise-native';

function formatUrl(url) {
  return {
    uri: `${url}?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
  };
}

async function requestJson(url) {
  return JSON.parse(await request(formatUrl(url)));
}

async function getPosts(resolve, reject) {
  const fileMeta = await requestJson('https://api.github.com/repos/JustinDFuller/medium-stories/contents');
  const filesWithDownloadUrls = _.filter(fileMeta, file => file['download_url'] && file.name !== 'README.md');
  
  return Promise.map(filesWithDownloadUrls, file => request(formatUrl(file.download_url)));
}

export const posts = async (event, context, callback) => {
  try {
    const res = await getPosts();
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
      },
      body: JSON.stringify(res)
    };
    return callback(null, response);
  } catch (e) {
    return callback(e);
  }
};
