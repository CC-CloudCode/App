var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var gruposRouter = require('./routes/grupos');
var betsRouter = require('./routes/bets');
var commentsRouter = require('./routes/comments');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var draftsRouter = require('./routes/drafts') 
var passport = require('passport')
var JWTStrategy= require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractFromQS = function(req){
  var token = null
  if(req.query && req.query.token) token = req.query.token
  return token
}

var extractFromBody = function(req){
  var token = null
  if(req.body && req.body.token) token = req.body.token
  return token
}

passport.use(new JWTStrategy({
  secretOrKey: 'PEI-BettingSpree2020',
  jwtFromRequest:ExtractJWT.fromExtractors([extractFromQS,extractFromBody]),
  passReqToCallback: true
}, async (req,payload,done) =>{
  try{
    return done(null,payload)
  }
  catch(error){
    return done(error)
  }
}))


var app = express();

var cors = require('cors')
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}
app.use(cors(corsOpts))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/grupos', gruposRouter);
app.use('/bets', betsRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/drafts', draftsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
