var fs = require('fs');
var path = require('path');
var data;

if( process.argv.length <= 2 ) {
    console.error('You must provide a config file');
    process.exit(-1);
}

var configpath = process.argv[2];
if( !configpath.match(/^\//) ) {
    configpath = path.join(process.cwd(), configpath);
}

module.exports = function() {
    if( !data ) {
        data = eval('('+fs.readFileSync(configpath, 'utf-8')+')');
    }
    return data;
}