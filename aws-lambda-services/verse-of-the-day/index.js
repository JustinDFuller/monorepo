import 'babel-polyfill';
import Promise from 'bluebird';
global.Promise = Promise;

export { dailyVerse } from './functions/dailyVerse';
export { proverb } from './functions/proverb';
export { psalm } from './functions/psalm';
export { random } from './functions/random';
export { versions } from './functions/versions';
