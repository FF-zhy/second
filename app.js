var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session')
const urlModule = require("url") 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 使用 express-session 中间件，使得 Express 应用支持 session 处理
app.use(session({
  secret: 'zhy123456qwe',
  resave:false,
  saveUninitialized: true,
  cookie : { maxAge: 30 * 60 * 1000 }
}));

//简单权限认证
app.use(function(req, res, next) {
  const {url} = req;
  const URL = urlModule.parse(url);
  const pathname = URL.pathname;
  // 判断路径条件
  console.log("path_______________",pathname);
  if(pathname.indexOf('api') !== -1 ) {
    //console.log("进入API接口")
    if(pathname.indexOf('login') !== -1 || 
        pathname.indexOf('logout') !== -1) {
      //console.log("进入login接口");
      next();
      return ;
    } else {
      // 访问了其他api[! login]
      if(! req.session.username) {
        //console.log("进入qita接口");
        res.redirect("/html/login.html");
      } else {
        // 存在用户
        //console.log("req.session.username___________",req.session.username);
        //console.log("进入用户存在，接口")
        next() ;
        return ;
      }
    }
  } else {
    console.log("没有进入API接口")
    next()
  }
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

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
