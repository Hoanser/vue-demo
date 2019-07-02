var express = require('express');
var mysql = require('mysql');
var async = require('async');
var db = require('../db');
var router = express.Router();

var conn = mysql.createConnection(db.mysql);
conn.connect();

//社区主页
router.get('/indexData', (req, res) => {
  var sql = "SELECT eid,userid,econtent,etitle,etime,eshow,ecommit FROM babyessay ORDER BY etime DESC, eshow DESC LIMIT 0, 10";
  conn.query(sql, function (err, result) {
    if(err){
      console.log(err);
    }else{
      sql = "SELECT nickname, headport FROM babyuser WHERE uid = ?";
      async.mapSeries(result, function (item, callback) {
        conn.query(sql, [item.userid], function (err, data) {
          if(err){
            console.log(err);
          }else{
            item.nickname = data[0].nickname;
            item.headport = data[0].headport;
            callback(null, item);
          }
        })
      },function (err, result) {
        res.json(result);
      })
    }
  })
})
//社区 产品讨论区
router.get('/disData', (req, res) => {
  var query = req.query;
  var pageSize = 5;
  var sqlexp =  " WHERE modal = " + query.modal;
  if(query.label != 0){
    sqlexp += ' AND label = ' + query.label;
  }
  async.waterfall([
    function (callback) {
      var sql = "SELECT COUNT(*) AS recordCount FROM babyessay" + sqlexp;
      conn.query(sql, function (err, result) {
        if(!err){
          callback(null, result)
        }
      })
    },
    function (one, callback) {
      one[0].pageCount = Math.ceil(one[0].recordCount/pageSize);
      one[0].pageSize = pageSize;
      callback(null, one)
    },
    function (two, callback) {
      var start = (query.pageNum - 1) * pageSize
      var sql = "SELECT eid,userid,econtent,etitle,etime,eshow,ecommit FROM babyessay" + sqlexp + " ORDER BY etime DESC LIMIT ?, ?";
      conn.query(sql, [start, pageSize], function (err, result) {
        if(!err){
          two[0].data = result;
          callback(null, two);
        }
      })
    },
    function (three, callback) {
      var sql = "SELECT nickname, headport FROM babyuser WHERE uid = ?";
      async.mapSeries(three[0].data, function (item, syntony) {
        conn.query(sql, [item.userid], function (err, data) {
          if(!err){
            item.nickname = data[0].nickname;
            item.headport = data[0].headport;
            syntony(null, item);
          }
        })
      },function (err, result) {
        three[0].data = result;
        callback(null, three);
      })
    }
  ], function (err, result) {
    res.json(result);
  })
})

module.exports = router
