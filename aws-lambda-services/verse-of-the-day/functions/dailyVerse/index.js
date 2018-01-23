import _ from 'lodash';
import { getVerseOfTheDay } from '@justindfuller/verse-of-the-day';

export async function dailyVerse(event, context, callback) {
  const queryStringParams = _.get(event, 'queryStringParameters');
  const query = queryStringParams ? JSON.parse(queryStringParams) : {};
  const version = _.get(query, 'version');
  const result = await getVerseOfTheDay(version);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
    },
    body: JSON.stringify(result),
  };

  return callback(null, response);
}

export default exports;
