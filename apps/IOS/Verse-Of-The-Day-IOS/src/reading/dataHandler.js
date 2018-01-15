import { isEmpty, get, uniqBy } from 'lodash';
import storage from './../storage';

function isExpired(previousCache) {
  return previousCache &&
         previousCache.expiration &&
         new Date(previousCache.expiration) <= new Date();
}

async function getVersion(versionProp) {
  return versionProp || await storage.get('SelectedBibleVersion') || 'eng-ESV';
}

async function fetchVerses(version) {
  try {
    const res = await fetch(`https://api.versefeed.com/dailyVerse/${version}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return res.json();
  } catch (e) {
    console.error(e);
    return false;
  }
}

function getExpiration(previousCache) {
  if (previousCache && previousCache.expiration) {
    return previousCache.expiration;
  }

  const newExpiration = new Date();
  newExpiration.setHours(23);
  newExpiration.setMinutes(59);
  newExpiration.setSeconds(0);
  return newExpiration;
}

function storeVerses(previousCache, newVerses, version) {
  const versesStore = {
    expiration: getExpiration(previousCache),
  };
  versesStore[version] = newVerses;
  storage.setJSON('StoredBibleVerses', versesStore);
}

function uniqueVerses(verses) {
  return uniqBy(verses, 'title');
}

async function getVerses(versionProp) {
  const version = await getVersion(versionProp);
  const cachedVerses = __DEV__ ? null : await storage.getJSON('StoredBibleVerses');
  let retrievedVerses = get(cachedVerses, `[${version}]`);

  if (!retrievedVerses || isEmpty(retrievedVerses) || isExpired(cachedVerses)) {
    retrievedVerses = await fetchVerses(version);
  }

  retrievedVerses = uniqueVerses(retrievedVerses);
  storeVerses(cachedVerses, retrievedVerses, version);
  return retrievedVerses;
}

export default {
  getVerses,
};
