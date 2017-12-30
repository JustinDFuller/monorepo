import 'babel-polyfill';
import { get } from 'lodash';
import { Parser } from 'xml2js';
import { promisify } from 'bluebird';
import request from 'request-promise-native';

const { parseString } = new Parser();
const parseStringPromise = promisify(parseString);

async function getPosts(resolve, reject) {
  const resultXML = await request('https://medium.com/feed/@justindanielfuller');
  const resultJSON = await parseStringPromise(resultXML);
  return get(resultJSON, 'rss.channel[0].item');
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
