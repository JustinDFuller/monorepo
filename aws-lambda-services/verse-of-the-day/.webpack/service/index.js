(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _client = __webpack_require__(19);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cache(client = _client2.default) {
  let getHash = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (key) {
      return redisClient.hgetallAsync(key);
    });

    return function getHash(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  let setHash = (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (key, value) {
      const result = yield redisClient.HMSETAsync(key, value);

      if (result) {
        expireAtMidnight(key);
      }
    });

    return function setHash(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })();

  const redisClient = _lodash2.default.isFunction(client) ? client() : client;

  function getSecondsUntilMidnight() {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const seconds = (midnight - Date.now()) / 1000;
    return Number(seconds.toFixed());
  }

  function expireAtMidnight(key) {
    return redisClient.expireAsync(key, getSecondsUntilMidnight());
  }

  function get(bibleID, key) {
    return getHash(`${bibleID}:${key}`);
  }

  function set(bibleID, key, value) {
    return setHash(`${bibleID}:${key}`, value);
  }

  return {
    get,
    set,
    getHash,
    setHash
  };
}

exports.default = cache;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const baseKey = 'DailyVerse';

function getCacheKey(props = {}) {
  return {
    book: `${baseKey}:EntireBook:${props.bibleID}`,
    bookIndex: `${baseKey}:RandomBookIndex`,
    chapter: `${baseKey}:Book:${props.theme}`,
    fullChapter: `${baseKey}:Fullchapter:${props.bookAbbr}:${props.chapter}:${props.version}`,
    verse: `${baseKey}:Verse:${props.identifier}`
  };
}

exports.default = getCacheKey;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseURL = 'https://bibles.org/v2';

function endpoint(props = {}) {
  return {
    books: `${baseURL}/versions/${props.bibleID}/books.js`,
    chapter: `${baseURL}/books/${props.bookID}/chapters.js`,
    fullChapter: `${baseURL}/passages.js?q[]=${props.bookAbbr}+${props.chapter}&version=${props.version}`,
    verse: `${baseURL}/chapters/${props.chapterID}/verses.js`,
    versions: `${baseURL}/versions.js?language=eng-US`
  };
}

module.exports = endpoint;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(8);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let fetchFromApi = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (url) {
    const cacheKey = `fetch:${url}`;
    const cached = yield (0, _cache2.default)().getHash(cacheKey);

    const headers = {
      url,
      headers: {
        Authorization: `Basic ${process.env.APIKEY || ''}`
      },
      resolveWithFullResponse: true
    };

    if (cached) {
      return JSON.parse(cached.response);
    }

    const response = cached || (yield (0, _nodeFetch2.default)(url, headers));
    const json = yield response.json();
    const data = json.response;
    yield (0, _cache2.default)().setHash(cacheKey, { response: (0, _stringify2.default)(data) });
    return data;
  });

  return function fetchFromApi(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _btoa = __webpack_require__(17);

var _btoa2 = _interopRequireDefault(_btoa);

var _nodeFetch = __webpack_require__(18);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = fetchFromApi;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(1);

function getRandomInt(max) {
  return (0, _lodash.random)(0, max);
}

module.exports = getRandomInt;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/number/is-integer");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versions = exports.random = exports.psalm = exports.proverb = exports.dailyVerse = undefined;

var _dailyVerse = __webpack_require__(12);

Object.defineProperty(exports, 'dailyVerse', {
  enumerable: true,
  get: function () {
    return _dailyVerse.dailyVerse;
  }
});

var _proverb = __webpack_require__(28);

Object.defineProperty(exports, 'proverb', {
  enumerable: true,
  get: function () {
    return _proverb.proverb;
  }
});

var _psalm = __webpack_require__(29);

Object.defineProperty(exports, 'psalm', {
  enumerable: true,
  get: function () {
    return _psalm.psalm;
  }
});

var _random = __webpack_require__(30);

Object.defineProperty(exports, 'random', {
  enumerable: true,
  get: function () {
    return _random.random;
  }
});

var _versions = __webpack_require__(31);

Object.defineProperty(exports, 'versions', {
  enumerable: true,
  get: function () {
    return _versions.versions;
  }
});

__webpack_require__(32);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Promise = _bluebird2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dailyVerse = undefined;

var _stringify = __webpack_require__(8);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let dailyVerse = exports.dailyVerse = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (event, context, callback) {
    const queryStringParams = _lodash2.default.get(event, 'queryStringParameters');
    const query = queryStringParams ? JSON.parse(queryStringParams) : {};
    const version = _lodash2.default.get(query, 'version');
    const result = yield (0, _dailyVerse2.default)(version);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: (0, _stringify2.default)(result)
    };
    console.log('RESULT', result);

    return callback(null, response);
  });

  return function dailyVerse(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _dailyVerse = __webpack_require__(13);

var _dailyVerse2 = _interopRequireDefault(_dailyVerse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = exports;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVerseOfTheDay = undefined;

var _promise = __webpack_require__(14);

var _promise2 = _interopRequireDefault(_promise);

var _assign = __webpack_require__(2);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let getVerseOfTheDay = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (bibleID = 'eng-ESV') {
    const addBibleID = function (v) {
      return (0, _assign2.default)({}, v, { bibleID });
    };
    return _promise2.default.all(views.map(addBibleID).map(getBook));
  });

  return function getVerseOfTheDay() {
    return _ref.apply(this, arguments);
  };
})();

var _promiseCompose = __webpack_require__(15);

var _promiseCompose2 = _interopRequireDefault(_promiseCompose);

var _books = __webpack_require__(16);

var _books2 = _interopRequireDefault(_books);

var _chapter = __webpack_require__(25);

var _chapter2 = _interopRequireDefault(_chapter);

var _verse = __webpack_require__(26);

var _verse2 = _interopRequireDefault(_verse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const views = [{
  theme: 'proverb',
  title: 'TODAY\'S PROVERB',
  bookName: 'Proverbs'
}, {
  theme: 'psalm',
  title: 'TODAY\'S PSALM',
  bookName: 'Psalm'
}, {
  theme: 'random',
  title: 'TODAY\'S VERSE',
  bookName: 'random'
}];

const getBook = (0, _promiseCompose2.default)(_books2.default, (0, _chapter2.default)().getRandomChapter, (0, _chapter2.default)().getFullChapter, (0, _verse2.default)());

exports.getVerseOfTheDay = getVerseOfTheDay;
exports.default = getVerseOfTheDay;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("promise-compose");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isInteger = __webpack_require__(9);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(2);

var _assign2 = _interopRequireDefault(_assign);

let getRandomIndex = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (bookArray) {
    const cacheKey = (0, _cacheKeys2.default)().bookIndex;
    let bookIndex = yield getHash(cacheKey);
    bookIndex = Number((0, _lodash.get)(bookIndex, 'bookIndex'));

    if (!(0, _isInteger2.default)(bookIndex)) {
      bookIndex = (0, _math2.default)(bookArray.length);
      yield setHash(cacheKey, { bookIndex });
    }

    return bookIndex;
  });

  return function getRandomIndex(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getRandomBook = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (bookArray) {
    const bookIndex = yield getRandomIndex(bookArray);
    return bookArray[bookIndex];
  });

  return function getRandomBook(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let getBook = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (props) {
    const url = (0, _endpoints2.default)(props).books;
    const res = yield (0, _fetch2.default)(url);
    const applicator = props.bookName === 'random' ? getRandomBook : getBookByName;
    const book = yield applicator(res.books, props.bookName);
    return createData(props, book);
  });

  return function getBook(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

var _lodash = __webpack_require__(1);

var _cacheKeys = __webpack_require__(4);

var _cacheKeys2 = _interopRequireDefault(_cacheKeys);

var _endpoints = __webpack_require__(5);

var _endpoints2 = _interopRequireDefault(_endpoints);

var _fetch = __webpack_require__(6);

var _fetch2 = _interopRequireDefault(_fetch);

var _math = __webpack_require__(7);

var _math2 = _interopRequireDefault(_math);

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getHash,
  setHash
} = (0, _cache2.default)();

function createData(props, book) {
  return (0, _assign2.default)({}, props, {
    bookName: (0, _lodash.get)(book, 'name'),
    bookAbbr: (0, _lodash.get)(book, 'abbr'),
    bookID: (0, _lodash.get)(book, 'id'),
    copyright: (0, _lodash.get)(book, 'copyright')
  });
}

function getBookByName(bookArray, bookName) {
  const filterBooks = ({ name }) => name.toLowerCase().indexOf(bookName.toLowerCase()) > -1;
  return bookArray.filter(filterBooks)[0];
}

module.exports = getBook;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("btoa");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = __webpack_require__(20);

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = __webpack_require__(21);

var _config2 = _interopRequireDefault(_config);

var _logging = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(...args) {
  (0, _logging.$log)().error('Redis Error', ...args);
}

exports.default = () => {
  const client = _redis2.default.createClient((0, _config2.default)());
  client.on('error', handleError);
  client.on('warning', handleError);
  _bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
  _bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);
  return client;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


function config(environment = process.env) {
  const isProd = environment.NODE_ENV === 'production';

  return {
    retry_strategy(options) {
      if (options.error) {
        console.error('CONNECTION ERROR', options.error);
        return new Error('An error occured while connecting to Redis.');
      }
    },
    host: isProd ? environment.REDISHOST : '127.0.0.1',
    port: isProd ? environment.REDISPORT : '6379',
    password: isProd ? environment.REDISAUTH : undefined
  };
}

exports.default = config;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$log = undefined;

var _appRootPath = __webpack_require__(23);

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _bunyan = __webpack_require__(24);

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $log(environment = process.env.NODE_ENV) {
  const streamOptions = {
    production: {
      level: 'warn',
      path: `${_appRootPath2.default}/logs/server.log`
    },
    development: {
      level: 'trace',
      stream: process.stdout,
      src: true
    },
    test: {
      level: 'trace',
      stream: process.stdout
    }
  };

  return environment !== 'development' && environment ? _bunyan2.default.createLogger({
    name: 'server',
    streams: [streamOptions[environment]]
  }) : console;
}

exports.$log = $log;
exports.default = $log;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("app-root-path");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(2);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(1);

var _cacheKeys = __webpack_require__(4);

var _cacheKeys2 = _interopRequireDefault(_cacheKeys);

var _endpoints = __webpack_require__(5);

var _endpoints2 = _interopRequireDefault(_endpoints);

var _math = __webpack_require__(7);

var _math2 = _interopRequireDefault(_math);

var _fetch = __webpack_require__(6);

var _fetch2 = _interopRequireDefault(_fetch);

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function chapter(cache = _cache2.default) {
  let getRandomChapter = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (props) {
      const chapterURL = (0, _endpoints2.default)(props).chapter;
      const cacheKey = (0, _cacheKeys2.default)(props).chapter;
      const res = yield (0, _fetch2.default)(chapterURL);
      const chapters = res.chapters;
      const stored = yield getHash(cacheKey);
      const randomNumber = (0, _lodash.get)(stored, 'randomNumber') || (0, _math2.default)(chapters.length - 1);
      const randomChapter = (0, _lodash.get)(chapters, `[${randomNumber}]`, {});
      const data = (0, _assign2.default)({}, props, {
        chapter: randomChapter.chapter,
        chapterID: randomChapter.id
      });
      setHash(cacheKey, { randomNumber });
      return data;
    });

    return function getRandomChapter(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  let getFullChapter = (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (book) {
      const props = (0, _assign2.default)({}, book, { version: book.bibleID });
      const url = (0, _endpoints2.default)(props).fullChapter;
      const res = yield (0, _fetch2.default)(url);
      const data = (0, _assign2.default)({}, book, {
        fullText: (0, _lodash.get)(res, 'search.result.passages[0].text')
      });
      return data;
    });

    return function getFullChapter(_x2) {
      return _ref2.apply(this, arguments);
    };
  })();

  const {
    getHash,
    setHash
  } = cache();

  return {
    getRandomChapter,
    getFullChapter
  };
}

module.exports = chapter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(2);

var _assign2 = _interopRequireDefault(_assign);

var _isInteger = __webpack_require__(9);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _asyncToGenerator2 = __webpack_require__(0);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(1);

var _cacheKeys = __webpack_require__(4);

var _cacheKeys2 = _interopRequireDefault(_cacheKeys);

var _endpoints = __webpack_require__(5);

var _endpoints2 = _interopRequireDefault(_endpoints);

var _text = __webpack_require__(27);

var _text2 = _interopRequireDefault(_text);

var _fetch = __webpack_require__(6);

var _fetch2 = _interopRequireDefault(_fetch);

var _math = __webpack_require__(7);

var _math2 = _interopRequireDefault(_math);

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verse(cache = _cache2.default) {
  let setVerseNumber = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (original, cacheKey, size) {
      let newVerseNumber = original;
      if (!(0, _isInteger2.default)(newVerseNumber)) {
        newVerseNumber = (0, _math2.default)(size);
        yield setHash(cacheKey, { newVerseNumber });
      }
      return newVerseNumber;
    });

    return function setVerseNumber(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();

  let getVerseNumber = (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (cacheKey, size) {
      let verseNumber = yield getHash(cacheKey);
      verseNumber = Number((0, _lodash.get)(verseNumber, 'newVerseNumber'));
      return setVerseNumber(verseNumber, cacheKey, size);
    });

    return function getVerseNumber(_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  })();

  let pickVerse = (() => {
    var _ref3 = (0, _asyncToGenerator3.default)(function* (identifier, verseArray) {
      const cacheKey = (0, _cacheKeys2.default)({ identifier }).verse;
      const verseNumber = yield getVerseNumber(cacheKey, verseArray.length);
      // default to first verse just in case.
      return verseArray[verseNumber];
    });

    return function pickVerse(_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  })();

  let getVerses = (() => {
    var _ref4 = (0, _asyncToGenerator3.default)(function* (chapter) {
      const verses = (0, _endpoints2.default)(chapter).verse;
      const versesResponse = yield (0, _fetch2.default)(verses);
      return versesResponse.verses;
    });

    return function getVerses(_x8) {
      return _ref4.apply(this, arguments);
    };
  })();

  let getRandomVerse = (() => {
    var _ref5 = (0, _asyncToGenerator3.default)(function* (chapter) {
      const verseArray = yield getRandomVerse.getVerses(chapter);
      const verseObj = yield getRandomVerse.pickVerse(chapter.theme, verseArray);
      return getRandomVerse.createVerseData(chapter, verseObj);
    });

    return function getRandomVerse(_x9) {
      return _ref5.apply(this, arguments);
    };
  })();

  const {
    getHash,
    setHash
  } = cache();

  function createVerseData(chapter = {}, randomVerse = {}) {
    return (0, _assign2.default)({}, chapter, {
      verse: randomVerse.verse,
      reference: randomVerse.reference,
      text: (0, _text2.default)(randomVerse.text)
    });
  }

  getRandomVerse.pickVerse = pickVerse;
  getRandomVerse.createVerseData = createVerseData;
  getRandomVerse.getVerseNumber = getVerseNumber;
  getRandomVerse.setVerseNumber = setVerseNumber;
  getRandomVerse.getVerses = getVerses;
  return getRandomVerse;
}

module.exports = verse;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(1);

function normalizeText(text = '') {
           return (0, _lodash.upperFirst)(text.replace(/<p(.*?)<\/sup>/igm, ' ').replace('\n', ' ').replace(/<(.*?)>/igm, ' ').replace(/\s{2,}/igm, ' ').replace(/^\s+/igm, '').replace(/\s+$/igm, ''));
}

module.exports = normalizeText;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import routes from './../../../../apps/backend/Verse-Of-The-Day-Server/utility/routes/routes';

// export const { proverb } = routes();

const proverb = exports.proverb = () => {};

exports.default = exports;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import routes from './../../../../apps/backend/Verse-Of-The-Day-Server/utility/routes/routes';

// export const { psalm } = routes();

const psalm = exports.psalm = () => {};

exports.default = exports;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import routes from './../../../../apps/backend/Verse-Of-The-Day-Server/utility/routes/routes';

// export const { random } = routes();

const random = exports.random = () => {};

exports.default = exports;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import routes from './../../../../apps/backend/Verse-Of-The-Day-Server/utility/routes/routes';

// export const { versions } = routes();

const versions = exports.versions = () => {};

exports.default = exports;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ })
/******/ ])));