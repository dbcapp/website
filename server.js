'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const app = express();

// Configuration Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/assets', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

require('./helpers/db').connect();

require('./helpers/passport')();

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
