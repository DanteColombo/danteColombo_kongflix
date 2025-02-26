var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride= require('method-override')
const session = require('express-session')
const multer = require("multer");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();



app.set('views', [
  (path.join(__dirname, 'views','partials')),
  (path.join(__dirname, 'views','products')),
  (path.join(__dirname, 'views','users')),
  
]);


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(methodOverride('method'));


app.use(express.json());
app.use(session({
  secret : 'codigo',
  resave : false,
  saveUninitialized : true
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);




app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
