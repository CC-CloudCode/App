var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fixturesRouter = require('./routes/fixtures');
var countriesRouter = require('./routes/countries');
var teamsRouter = require('./routes/teams');
var head2headRouter = require('./routes/head2head');
var leaguesRouter = require('./routes/leagues');
var scoresRouter = require('./routes/scores');
var teamstatsRouter = require('./routes/teamstats');

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

app.use('/fixtures', fixturesRouter);
app.use('/countries', countriesRouter);
app.use('/teams', teamsRouter);
app.use('/head2head', head2headRouter);
app.use('/leagues', leaguesRouter);
app.use('/scores', scoresRouter);
app.use('/teamstats', teamstatsRouter);

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
