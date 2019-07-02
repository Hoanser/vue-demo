var express = require('express');
var bodyParser = require('body-parser');
var shopApi = require('./api/shopApi');
var userApi = require('./api/userApi');
var commApi = require('./api/commApi');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//将路由级中间件挂载到应用
app.use('/api/shop', shopApi);
app.use('/api/user', userApi);
app.use('/api/comm', commApi);

app.listen(3000);
console.log('success listen at port:3000......');
