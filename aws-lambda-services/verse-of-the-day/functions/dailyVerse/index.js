import _ from 'lodash';
import getVerseOfTheDay from './../../src/feature/dailyVerse/dailyVerse';

export async function dailyVerse(event, context, callback) {
  try {
    const query = JSON.parse(_.get(event, 'queryStringParameters'));
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
  } catch (e) {
    return callback(e);
  }
}

export default exports;
