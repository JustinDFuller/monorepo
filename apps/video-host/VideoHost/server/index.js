
/**
 * Entry point to the server, uses clusterHandler to create clusters.
 * It then passes in a callback function to execute for non-master clusters.
 */
const appRoot = require('app-root-path');


/**
 * Use .env file for environmental variables.
 */
require('dotenv').config();

const routes = require(`${appRoot}/server/Routes`);
const server = require(`${appRoot}/server/Util/ServerHandler`);
const Cluster = require('./Util/ClusterHandler');

module.exports = new Cluster(server, routes);
