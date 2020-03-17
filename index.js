var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./lib/config');

app.use(bodyParser.json({}));

app.get('/', require('./lib/middleware'));
app.post('/', require('./lib/middleware'));
app.listen(config.port || 8080);
console.log(`Listening on ${config.port || 8080}`);