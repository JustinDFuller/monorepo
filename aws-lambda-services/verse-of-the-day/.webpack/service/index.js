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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versions = exports.random = exports.psalm = exports.proverb = exports.dailyVerse = undefined;

var _dailyVerse = __webpack_require__(1);

Object.defineProperty(exports, 'dailyVerse', {
  enumerable: true,
  get: function () {
    return _dailyVerse.dailyVerse;
  }
});

var _proverb = __webpack_require__(5);

Object.defineProperty(exports, 'proverb', {
  enumerable: true,
  get: function () {
    return _proverb.proverb;
  }
});

var _psalm = __webpack_require__(6);

Object.defineProperty(exports, 'psalm', {
  enumerable: true,
  get: function () {
    return _psalm.psalm;
  }
});

var _random = __webpack_require__(7);

Object.defineProperty(exports, 'random', {
  enumerable: true,
  get: function () {
    return _random.random;
  }
});

var _versions = __webpack_require__(8);

Object.defineProperty(exports, 'versions', {
  enumerable: true,
  get: function () {
    return _versions.versions;
  }
});

__webpack_require__(9);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Promise = _bluebird2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dailyVerse = undefined;

var _stringify = __webpack_require__(2);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let dailyVerse = exports.dailyVerse = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (event, context, callback) {
    const queryStringParams = _lodash2.default.get(event, 'queryStringParameters');
    const query = queryStringParams ? JSON.parse(queryStringParams) : {};
    const version = _lodash2.default.get(query, 'version');
    const result = yield (0, _verseOfTheDay.getVerseOfTheDay)(version);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: (0, _stringify2.default)(result)
    };

    return callback(null, response);
  });

  return function dailyVerse(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

var _verseOfTheDay = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"@justindfuller/verse-of-the-day\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = exports;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import { getListOfVersions } from '@justindfuller/verse-of-the-day';

const versions = exports.versions = () => {};

exports.default = exports;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ])));