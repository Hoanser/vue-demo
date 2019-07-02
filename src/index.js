var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

var server = http.createServer();
server.on('request', doRequest);
server.listen('8080', '127.0.0.1', function (err) {
  console.log('服务器启动成功，正在监听8080端口...');
});

function doRequest() {
  console.log('web服务器接收到一个客户端请求...');
}
