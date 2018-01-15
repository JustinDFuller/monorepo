class Log {
  constructor(...args) {
    Log.processLog('log', ...args);
  }

  static log(...args) {
    Log.processLog('log', ...args);
  }

  static info(...args) {
    Log.processLog('info', ...args);
  }

  static warn(...args) {
    Log.processLog('warn', ...args);
  }

  static error(...args) {
    Log.processLog('error', ...args);
  }

  static processLog(method, ...args) {
    if (showConsole(process.env.NODE_ENV)) {
      console[method](...args);
      return true;
    }

    return false;
  }
}

function showConsole(environment) {
  const environments = {
    test: false,
    development: true,
    production: false,
  };
  return environments[environment];
}

module.exports = Log;
