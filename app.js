var createError = require('http-errors');
var express = require('express');
const fs = require('fs')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var app = express();

app.use(connectLiveReload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// A voir si ça peut convenir : https://stackoverflow.com/questions/60494449/how-to-save-rendered-html-view-files-from-expressjs-routes
// app.get('/', (req, res, next) => {
//   res.render('./pages/home')
//     exportTemplateFile('views/pages/home.ejs', 'index.html');
//     console.log('file rendered and saved successfully')
// })

// function createTemplateFile(filename) {
//   fs.open(filename,'r',function(err, fd){
//     if (err) {
//       fs.writeFile(filename, '', function(err) {
//           if(err) {
//               console.log(err);
//           }
//       });
//     }
//   });
// }

// async function exportTemplateFile(templateLocation, templateName) {
//   var html = await ejs.renderFile(templateLocation);

//   createTemplateFile('templates/'+templateName);

//   var stream = fs.createWriteStream('templates/'+templateName);
//   stream.once('open', function (fd) {
//     stream.write(`${html}`);
//     stream.end();
//   });
// }

module.exports = app;
