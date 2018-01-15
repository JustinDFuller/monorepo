const appRoot = require('app-root-path');
const cluster = require('cluster');
const _ = require('lodash');
const os = require('os');

const log = require(`${appRoot}/server/Util/log`);

class ClusterHandler {
  constructor(...args) {
    const isMaster = cluster.isMaster;
    return ClusterHandler.createClusters(isMaster, ...args);
  }

  static createClusters(isMaster, callback, routes) {
    if (!_.isFunction(callback)) {
      throw new TypeError('ClusterHandler callback must be a function.');
    }

    if (isMaster) {
      return os.cpus().map(ClusterHandler.forkCluster);
    }

    return callback(routes);
  }

  static forkCluster(cpu, index) {
    cluster.fork();
    cluster.on('exit', ClusterHandler.endCluster);
    return index;
  }

  static endCluster(worker) {
    const pid = _.get(worker, 'process.pid');
    log.log(`worker ${pid} died`);
    cluster.fork();
  }
}

module.exports = ClusterHandler;
