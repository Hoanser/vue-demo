var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var async = require('async')

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
// 增加用户查询接口
router.post('/selectuser', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  conn.query(sql, [params.username], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result[0]);
    }
  })
});

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.age], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
// 增加注册接口
router.post('/reg', (req, res) => {
  //console.log(req)
  var sql = $sql.user.selectuser;
  var params = req.body;
  //console.log(params);
  conn.query(sql, [params.username], function(err, result) {
    /*if (err) {
     console.log(err);
     }*/
    if (result) {
      if(result.length > 0){
        jsonWrite(res, {status:0,data: '已存在该用户'});
      }else{
        sql = $sql.user.newuser;
        conn.query(sql, [params.username, params.userpwd], function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result.insertId) {
            jsonWrite(res, {status:1,data: '注册成功'});
          }
        })
      }
    }
  })
});
// 增加登录接口
router.post('/login', (req, res) => {
  //console.log(req)
  var sql = $sql.user.selectuser;
  var params = req.body;
  //console.log(params);
  conn.query(sql, [params.username, params.userpwd], function(err, result) {
    /*if (err) {
     console.log(err);
     }*/
    if (result) {
      if(result.length > 0){
        jsonWrite(res, {status:1,data: '登录成功'});
      }else{
        jsonWrite(res, {status:0,data: '用户名或密码错误'});
      }
    }
  })
});
// 增加收货地址查询接口
router.post('/useraddress', (req, res) => {
  //console.log(req)
  var sql = $sql.user.selectuser;
  var params = req.body;
  var userid = ''
  //console.log(params);
  conn.query(sql, [params.username], function(err, result) {
    /*if (err) {
     console.log(err);
     }*/
    console.log(result)
    sql = $sql.user.useraddres
    conn.query(sql, [result[0].uid], function(err, result) {
      if (result) {
        if(result.length > 0){
          jsonWrite(res, result);
        }else{
          jsonWrite(res, {status:0,data: '无收货地址'});
        }
      }
    })

  })
});
// 增加省查询接口
router.get('/prov', (req, res) => {
  var sql = $sql.user.rcprov;
  conn.query(sql, function(err, result) {
    if (result) {
      if(result.length > 0){
        jsonWrite(res, result);
      }else{
        jsonWrite(res, {status:0});
      }
    }
  })
});
// 增加市查询接口
router.get('/cities', (req, res) => {
  var sql = $sql.user.rccity;
  var params = req.query;
  conn.query(sql, [params.provinceid], function(err, result) {
    if (result) {
      if(result.length > 0){
        jsonWrite(res, result);
      }else{
        jsonWrite(res, {status:0});
      }
    }
  })
});
// 增加区/县查询接口
router.get('/areas', (req, res) => {
  var sql = $sql.user.rcarea;
  var params = req.query;
  conn.query(sql, [params.cityid], function(err, result) {
    if (result) {
      if(result.length > 0){
        jsonWrite(res, result);
      }else{
        jsonWrite(res, {status:0});
      }
    }
  })
});

// 增加添加新地址查询接口
router.post('/addnewaddress', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  var uid;
  conn.query(sql, [params.username], function(err, result) {
    sql = $sql.user.useraddres;//先查询数据库用用户是否有收获地址记录
    uid = result[0].uid
    conn.query(sql, [uid], function(err, result) {
      if (result) {
        params.type = result.length > 0?0:1;
        sql = $sql.user.addnewaddress
        conn.query(sql, [uid, params.recname, params.prov, params.provinceid, params.city, params.cityid, params.area, params.countryid, params.address, params.recphone, params.type, params.label, params.postcode, params.telephone], function(err, result) {
          console.log(result)
          if (err) {
            console.log(err)
            jsonWrite(res, {status:0, data: '保存失败'});
            return;
          }
          if (result) {
            jsonWrite(res, {status:1, data: '保存成功'});
          }
        })
      }
    })
  })

  /**/
});

// 增加删除地址接口
router.post('/deleteaddress', (req, res) => {
  var sql = $sql.user.deleteaddress;
  var params = req.body;
  conn.query(sql, [params.aid], function(err, result) {
    if (err) {
      jsonWrite(res, {status:0, data: '保存失败'});
      return;
    }
    if (result) {
      jsonWrite(res, {status:1, data: '删除成功'});
    }
  })
});

// 增加修改默认地址接口
router.post('/updatadefault', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  var uid;
  conn.query(sql, [params.username], function(err, result) {
    sql = $sql.user.selectdefault;
    conn.query(sql,  [result[0].uid], function(err, result) {
      if(result){
        sql = $sql.user.setdefaultclear;
        var aid = result[0].aid;
        conn.query(sql,  [aid], function(err, result) {
          if(result){
            console.log(params.aid)
            sql = $sql.user.setdefault;
            conn.query(sql, [params.aid], function(err, result) {
              if (err) {
                jsonWrite(res, {status:0, data: '修改失败'});
                return;
              }
              if (result) {
                jsonWrite(res, {status:1, data: '修改成功'});
              }
            })
          }
        })
      }
    })
  })


});

// 增加修改收货地址接口
router.post('/updataddress', (req, res) => {
  var sql = $sql.user.updataddress;
  var params = req.body;
  conn.query(sql, [params.recname, params.prov, params.provinceid, params.city, params.cityid, params.area, params.countryid, params.address, params.recphone, params.type, params.label, params.postcode, params.telephone, params.aid], function(err, result) {
    if (err) {
      jsonWrite(res, {status:0, data: '修改失败'});
      return;
    }
    if (result) {
      jsonWrite(res, {status:1, data: '修改成功'});
    }
  })
});

// 增加查询订单接口（包括全部订单，代付款订单、已完成订单、退换货订单）
router.post('/getorder', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  var uid;
  var orderlist = [];
  var orderesult = [];
  conn.query(sql, [params.username], function(err, result) {
    sql = $sql.user.selectorder;
    conn.query(sql, [result[0].uid, params.orderstatus], function(err, result) {
      if(result){
        if(result.length > 0){
          /*jsonWrite(res, {status:1, data:result});*/
          var n = 0;
          orderlist = result;
          sql = $sql.user.selectorderpro;
          var forfun = function(){
            if(n<orderlist.length){
              conn.query(sql, [orderlist[n].orderid], function(err, result) {
                orderlist[n].prolist = result;
                n++;
                forfun();
              })
            }else{
              jsonWrite(res, {status:1, data: orderlist});
            }
          }
          forfun();
        }else{
          jsonWrite(res, {status:0, data: '没有订单数据'});
        }
      }
    })
  })



});
// 增加修改订单状态为退货
router.post('/salesreturn', (req, res) => {
  var sql = $sql.user.salesreturn;
  var params = req.body;
  console.log(params)
  conn.query(sql, [params.orderid], function(err, result) {
    if(result){
      jsonWrite(res, {status:1, data: '退货成功'});
    }else{
      jsonWrite(res, {status:0, data: '退货失败'});
    }
  })
});
// 增加修改订单状态为换货
router.post('/exchangegoods', (req, res) => {
  var sql = $sql.user.exchangegoods;
  var params = req.body;
  conn.query(sql, [params.orderid], function(err, result) {
    if(result){
      jsonWrite(res, {status:1, data: '换货成功'});
    }else{
      jsonWrite(res, {status:0, data: '换货失败'});
    }
  })
});

// 增加修改密码接口
router.post('/setnewpwd', (req, res) => {
  var sql = $sql.user.userlogin;
  var params = req.body;
  console.log(params)
  conn.query(sql, [params.username, params.olduserpwd], function(err, result) {
    if(result){
      if(result.length > 0){
        sql = $sql.user.setnewpwd;
        conn.query(sql, [params.newuserpwd, params.username], function(err, result) {
          if(result){
            jsonWrite(res, {status:1, data: '密码修改成功'});
          }else{
            jsonWrite(res, {status:0, data: '密码修改失败'});
          }
        })
      }else{
        jsonWrite(res, {status:-1, data: '原密码错误'});
      }
    }
  })
});

// 增加发布新帖接口
router.post('/publish', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  conn.query(sql, [params.username], function(err, result) {
    if(result){
      if(result.length > 0){
        sql = $sql.user.newessay;
        var timenow = Date.parse(new Date())
        conn.query(sql, [result[0].uid, params.content, params.title, timenow, params.modal, params.label], function(err, result) {
          if(result){
            jsonWrite(res, {status:1, data: result});
          }else{
            jsonWrite(res, {status:0, data: '发布失败'});
          }
        })
      }
    }
  })
});

// 增加查询帖子接口
router.post('/showessay', (req, res) => {
  var sql = $sql.user.selectessay;
  var params = req.body;
  var resultdata = {}
  conn.query(sql, [params.eid], function(err, result) {
    if(result){
      if(result.length > 0){
        resultdata.status = 1
        resultdata.data = {}
        resultdata.data.essay = result[0]
        sql = $sql.user.selectuserid;
        console.log(result[0].userid)
        // 根据userid查询发表用户的信息
        conn.query(sql, [result[0].userid], function(err, result) {
          console.log(result)
          resultdata.data.user = {}
          resultdata.data.user.username = result[0].username
          resultdata.data.user.nickname = result[0].nickname
          resultdata.data.user.gender = result[0].gender
          resultdata.data.user.signature = result[0].signature
          resultdata.data.user.headport = result[0].headport

          /*根据eid得到评论数据*/
          sql = $sql.user.selectcomment;
          conn.query(sql, [params.eid], function(err, result) {

            /*遍历评论数据，查询用户表，查询评论用户的信息*/
            sql = $sql.user.selectuserid;
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
                resultdata.data.comment = result
                jsonWrite(res, resultdata);
              }
            )
          })
        })
      }
    }
  })
});

// 增加评论接口
router.post('/pubcomment', (req, res) => {
  var sql = $sql.user.selectuser;
  var params = req.body;
  conn.query(sql, [params.username], function(err, result) {
    if(result){
      if(result.length > 0){
        sql = $sql.user.newcomment;
        var ctime = Date.parse(new Date())
        conn.query(sql, [params.eid,result[0].uid,ctime,params.content], function(err, result) {
          console.log(result)
          if(result){
            jsonWrite(res, {status:1, data: '评论成功'})
          }
        })
      }
    }
  })
});

// 增加修改个人信息接口
router.post('/updatauserinfo', (req, res) => {
  var sql = $sql.user.updatauserinfo;
  var params = req.body;
  conn.query(sql, [params.nickname, params.phone, params.gender, params.signature, params.username], function(err, result) {
    if(result){
      jsonWrite(res, {status: 1, data: '修改成功'})
    }else{
      jsonWrite(res, {status: 0, data: '修改失败'})
    }
  })
});

// 增加修改头像接口
router.post('/updataport', (req, res) => {
  var sql = $sql.user.updataport;
  var params = req.body;
  conn.query(sql, [params.headport, params.username], function(err, result) {
    if(result){
      jsonWrite(res, {status: 1, data: '修改成功'})
    }else{
      jsonWrite(res, {status: 0, data: '修改失败'})
    }
  })
});
module.exports = router;
