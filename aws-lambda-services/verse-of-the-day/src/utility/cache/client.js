import redis from 'redis';
import bluebird from 'bluebird';
import config from './config';
import {
  $log
} from './../logging';

function handleError(...args: any[]): void {
  $log().error('Redis Error', ...args);
}

export default () => {
  const client = redis.createClient(config());
  client.on('error', handleError);
  client.on('warning', handleError);
  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);
  return client;
};