var OSRM = require('osrm');
var config = require('./config');
var path = require('path');

var datapath = config.data;
if( !datapath.match(/^\//) ) {
    datapath = path.join(process.cwd(), datapath);
}

console.log(`Starting OSRM Server with: ${datapath}`);
var osrm = new OSRM(datapath);
console.log('Server ready.');

module.exports = function() {
    return osrm;
}