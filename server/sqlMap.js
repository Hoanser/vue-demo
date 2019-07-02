// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)',
        selectuser: 'select * from babyuser where username = ?',
        selectuserid: 'select * from babyuser where uid = ?',
        newuser: 'insert into babyuser(uid, username, password) values (0, ?, ?)', // 注册
        userlogin: 'select * from babyuser where username = ? and password = ?', // 登录
        useraddres: 'select * from babyaddress where userid = ?', //查询用户收货地址
        rcprov: 'select * from provinces', //查询省
        rccity: 'select * from cities where provinceid = ?', //查询市
        rcarea: 'select * from areas where cityid = ?', //查询区/县
        addnewaddress: 'INSERT INTO `baby`.`babyaddress` (`userid`, `recname`, `prov`, `provinceid`, `city`, `cityid`, `country`, `countryid`, `address`, `recphone`, `type`, `label`, `postcode`, `telephone`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', //增加收货地址
        deleteaddress: 'delete from babyaddress where aid = ?', //删除收货地址
        selectdefault: 'select * from babyaddress where type = 1 and userid = ?', //修改默认地址
        setdefaultclear: 'update babyaddress set type=0 where aid = ?',
        setdefault: 'update babyaddress set type=1 where aid = ?',
        updataddress: 'update babyaddress set recname=?, prov=?, provinceid=?, city=?, cityid=?, country=?, countryid=?, address=?, recphone=?, type=?, label=?, postcode=?, telephone=? where aid=?', //修改收货地址
        selectorder: 'select * from babyorder where userid = ? and orderstatus in (?)', //查询用户订单
        selectorderpro: 'select * from babyorderproduct where orderid = ?', //查询订单产品
        salesreturn: 'update babyorder set orderstatus=2 where orderid = ?', //修改订单状态为退货
        exchangegoods: 'update babyorder set orderstatus=3 where orderid = ?', //修改订单状态为换货
        setnewpwd: 'update babyuser set password= ? where username = ?',
        newessay: 'INSERT INTO babyessay (userid, econtent, etitle, etime, modal, label) VALUES (?, ?, ?, ?, ?, ?)',//保存新帖子
        selectessay: 'select * from babyessay where eid = ?',
        selectcomment: 'SELECT * FROM babycomment WHERE essayid=? ORDER BY cid DESC',//cid倒序显示评论数据
        newcomment: 'INSERT INTO babycomment (essayid, userid, ctime, ccontent, recommentid) VALUES (?, ?, ?, ?, 0)',//保存新新评论（暂时不做回复功能，recommentid默认为0）,
        updatauserinfo: 'update babyuser set nickname=?, phone=?,gender=?,signature=? where username = ?',
        updataport: 'update babyuser set headport=? where username = ?'
    }
}

module.exports = sqlMap