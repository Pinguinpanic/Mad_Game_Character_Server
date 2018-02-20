var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({		
    secret: 'keyboard cat',		
    resave: false,		
    saveUninitialized: false		
}));		
app.use(passport.initialize());		
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
// passport config		
var Account = require('./models/account');		
passport.use(new LocalStrategy(Account.authenticate()));		
passport.serializeUser(Account.serializeUser());		
passport.deserializeUser(Account.deserializeUser());		
// mongoose		
mongoose.connect('mongodb://PrototypeService:xEcmdgoVKAY9Fx8X@prototypecluster-shard-00-00-f83wb.mongodb.net:27017,prototypecluster-shard-00-01-f83wb.mongodb.net:27017,prototypecluster-shard-00-02-f83wb.mongodb.net:27017/test?ssl=true&replicaSet=PrototypeCluster-shard-0&authSource=admin');
//mongoose.connect('mongodb://localhost:12345/passport_local_mongoose_express4');		
//mongoose.connect('mongodb://PrototypeService:xEcmdgoVKAY9Fx8X@prototypecluster-shard-00-00-f83wb.mongodb.net:27017,prototypecluster-shard-00-01-f83wb.mongodb.net:27017,prototypecluster-shard-00-02-f83wb.mongodb.net:27017/test?ssl=true&replicaSet=PrototypeCluster-shard-0&authSource=admin');
//'mongodb://PrototypeService:xEcmdgoVKAY9Fx8X@prototypecluster-shard-00-00-f83wb.mongodb.net:27017,prototypecluster-shard-00-01-f83wb.mongodb.net:27017,prototypecluster-shard-00-02-f83wb.mongodb.net:27017/test?ssl=true&replicaSet=PrototypeCluster-shard-0&authSource=admin'

//PrototypeService
//xEcmdgoVKAY9Fx8X

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
