var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var session = require('express-session');
var userRouter = require('./routes/user.js');
var httpResult = require('./config');
var categoryRouter = require('./routes/category.js');
var productRouter = require('./routes/product.js');
var cartRouter = require('./routes/cart.js');
var addressRouter = require('./routes/address.js');
var orderRouter = require('./routes/order.js');
var myorderRouter = require('./routes/myorder.js');
var Token = require('./utils/token.js');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
	secret: 'shitai',  //session的加密字符串(密钥)
	cookie: { httpOnly: true, maxAge: 1000* 60 * 20 },//客户端的sid只读，在20分钟内cookie的过期，都是客户端的sid值消失，服务器会回收
	rolling:true,   //重置客户端与session相关的cookie的过期时间
	saveUninitialized: false, //向服务器放东西的时候再开辟空间
	resave: false  //是否每次客户端与服务器端交互都要更改cookie的值
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(/\/cart|\/address/, Token.check);

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product',productRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/myorder', myorderRouter);
// 统一将动态数据请求进行响应返回
app.use(function(req,res,next){
    if(res.myPromise) {
        res.myPromise
            // result = {status:??, data: ??, message:??}
            .then(result => res.send(result))
            // .then(res.send)
            .catch(err => res.send(httpResult.error(err.message)));
    }else next();
});

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
