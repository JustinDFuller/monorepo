import {
  add,
  subtract,
  lte,
  gte,
} from 'lodash/fp';

const addTwelve = add(12);
const subtractTwelve = subtract(12);

function modifyDateByTwelve(modifier) {
  const date = new Date();
  date.setHours(modifier(date.getHours));
  return date;
}

export function twelveHoursAgo() {
  return modifyDateByTwelve(subtractTwelve);
}

export function twelveHoursFromNow() {
  return modifyDateByTwelve(addTwelve);
}

export function isAfterTwelveHoursAgo(date) {
  if (lte(date, twelveHoursAgo())) {
    throw new Error(`Date ${date} is not valid because it's older than twelve hours.`);
  }
}

export function isBeforeTwelveHoursFromNow(date) {
  if (gte(date, twelveHoursFromNow())) {
    throw new Error(`Date ${date} is not valid because it's more than twelve hours in the future.`);
  }
}

export default {
  twelveHoursAgo,
  isAfterTwelveHoursAgo,
  twelveHoursFromNow,
  isBeforeTwelveHoursFromNow,
};
