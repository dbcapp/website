'use strict';

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const passport = require('passport');
const routes = require('./routes');
const mongooseConnection = require('./helpers/db').connect();

const app = express();

const port = process.env.NODE_PORT || 3000;

// Configuration Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.use('/assets', express.static('public'));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.NODE_SESSION,
  store: new MongoStore({mongooseConnection}),
  resave: true,
  saveUninitialized: false
}));
app.use(flash());

app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

app.use('/', routes);

require('./helpers/passport')();

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
