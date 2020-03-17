const path = require('path');
const config = {
    port : process.env.PORT || 5000,
    data : process.env.DATA_PATH || path.resolve(__dirname, '..', 'data/merged/merged.osrm')
}

module.exports = config;