import 'babel-polyfill';
import Promise from 'bluebird';

export const posts = async (event, context, callback) => {
  try {
    const res = await Promise.resolve();
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
