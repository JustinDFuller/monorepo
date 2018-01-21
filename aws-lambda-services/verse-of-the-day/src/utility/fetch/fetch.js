import request from 'request-promise';
import cache from './../cache';

async function fetchFromApi(url: string): Promise<any> {
  const cacheKey = `fetch:${url}`;
  const cached = await cache().getHash(cacheKey);

  const headers = {
    url,
    headers: {
      Authorization: `Basic ${process.env.APIKEY || ''}`,
    },
    resolveWithFullResponse: true,
  };

  try {
    if (cached) {
      return JSON.parse(cached.response);
    }

    const response: { body: string } = cached || await request(headers);
    const data: any = JSON.parse(response.body).response;
    await cache().setHash(cacheKey, { response: JSON.stringify(data) });
    return data;
  } catch (e) {
    throw new TypeError('An error occured while retrieving the verse data.');
  }
}

module.exports = fetchFromApi;
