var express = require('express');
var mysql = require('mysql');
var async = require('async');
var db = require('../db');
var router = express.Router();

var conn = mysql.createConnection(db.mysql);
conn.connect();

//shop首页
router.get('/goodlist', (req, res) => {
  var sql = "SELECT pid, pname, pdescribe, price FROM product";
  conn.query(sql, function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
});
//shop详情页
router.get('/detail', (req, res) => {
  var sql = "SELECT * FROM product WHERE pid = ?";
  conn.query(sql, [req.query.gid], function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})
router.post('/addcart', (req, res) => {
  var sql = "SELECT uid FROM babyuser WHERE username = ?"
  var params = req.body;
  conn.query(sql, [params.uname], function (err, result) {
    if(result){
      sql = "INSERT INTO cart(uid, pname, price, color, size, pic, num) VALUES(?, ?, ?, ?, ?, ?, ?)";
      conn.query(sql, [result[0].uid, params.pname, params.price, params.color, params.size, params.pic, params.num], function (err, result) {
        if(err){
          console.log(err);
        }else{
          res.send('success');
        }
      })
    }

  })
})
//shop购物车页
router.post('/cart', (req, res) => {
  var sql = "SELECT uid FROM babyuser WHERE username = ?";
  var params = req.body;
  conn.query(sql, [params.uname], function (err, result) {
    if(result){
      sql = "SELECT * FROM cart WHERE uid = ?";
      conn.query(sql, [result[0].uid], function (err, result) {
        if(err){
          console.log(err);
        }else{
          res.json(result);
        }
      })
    }
  })
})
router.post('/numchange', (req, res) => {
  var sql = "UPDATE cart SET num = ? WHERE cid = ?";
  var params = req.body;
  conn.query(sql, [params.num, params.cid], function (err, result) {
    if(err){
      console.log(err);
    }
  })
})
router.post('/delcart', (req, res) => {
  var sql = "DELETE FROM cart WHERE cid = ?";
  var params = req.body;
  conn.query(sql, [params.cid], function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.send('success');
    }
  })
})
//shop下单页
router.post('/orderGoods', (req, res) => {
  var params = req.body;
  var sql = "SELECT * FROM cart WHERE ";
  let len = params.goods.length;
  for(let i = 0; i < len; i++){
    if((i+1) < len){
      sql += 'cid = ' + params.goods[i] + ' ||'
    }else{
      sql += 'cid = ' + params.goods[i]
    }
  }
  conn.query(sql, function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})
router.post('/addorder', (req, res) => {
  var params= req.body;
  var sql = "SELECT uid FROM babyuser WHERE username = ?"
  conn.query(sql, [params.uname], function (err, result) {
    if(err){
      console.log(err);
    }else{
      async.waterfall([
        function (callback) {
          sql = "INSERT INTO babyorder(userid, ordernumber, recname, createtime, orderstatus, recaddress, invoicetype, invoicetitle, summoney, recphone, postcode, telephone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          conn.query(sql, [
            result[0].uid,
            '' + params.ordernumber + result[0].uid,
            params.recname,
            params.createtime,
            params.orderstatus,
            params.recaddress,
            params.invoicetype,
            params.invoicetitle,
            params.summoney,
            params.recphone,
            params.postcode,
            params.telephone,
          ], function (err, result) {
            if(!err){
              callback(null, result)
            }
          })
        },
        function (one, callback) {
          sql = "INSERT INTO babyorderproduct(orderid,count,productname,productprize,productcolor,productsize,productimg) VALUES(?,?,?,?,?,?,?)"
          async.mapSeries(params.plists, function (item, syntony) {
            conn.query(sql, [one.insertId, item.num, item.pname, item.price, item.color, item.size, item.pic], function (err, result) {
              if(err){
                console.log(err);
              }else{
                syntony(null, 'success')
              }
            })
          }, function (err, result) {
            if(!err){
              callback(null, one)
            }
          })
        }], function (err, result) {
        if(!err){
          res.json(result);
        }
      })
    }
  })
})
//shop支付页
router.get('/payMoney', (req, res) => {
  var sql = "SELECT summoney FROM babyorder WHERE orderid = ?";
  conn.query(sql, [req.query.oid], function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  })
})
router.post('/payOrder', (req, res) => {
  var sql = "UPDATE babyorder SET orderstatus = ? WHERE orderid = ?";
  conn.query(sql, [1, req.body.oid], function (err, result) {
    if(err){
      console.log(err);
    }else{
      res.send('success');
    }
  })
})

module.exports = router
