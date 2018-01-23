import _ from 'lodash';
import defaultClient from './client';
import type { Verse } from './../../types/Verse.type';
import type { Client } from './../../types/Redis.type';

function cache(client: Client = defaultClient): * {
  const redisClient = _.isFunction(client) ? client() : client;

  function getSecondsUntilMidnight(): number {
    const midnight: Date = new Date();
    midnight.setHours(24, 0, 0, 0);
    const seconds: number = (midnight - Date.now()) / 1000;
    return Number(seconds.toFixed());
  }

  function expireAtMidnight(key: string): Promise<any> {
    return redisClient.expireAsync(key, getSecondsUntilMidnight());
  }

  async function getHash(key: string): Promise<any> {
    return redisClient.hgetallAsync(key);
  }

  async function setHash(key: string, value: any): Promise<void> {
    const result = await redisClient.HMSETAsync(key, value);

    if (result) {
      expireAtMidnight(key);
    }
  }

  function get(bibleID: string, key: string): Promise<Verse> {
    return getHash(`${bibleID}:${key}`);
  }

  function set(bibleID: string, key: string, value: Verse): Promise<void> {
    return setHash(`${bibleID}:${key}`, value);
  }

  return {
    get,
    set,
    getHash,
    setHash,
  };
}

export default cache;
