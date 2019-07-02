<template>
  <div class="shoporder">
    <com-header/>
    <div class="shop-process">
      <ul>
        <li>1.我的购物车</li>
        <li class="selected">2.填写订单信息</li>
        <li>3.完成支付</li>
      </ul>
    </div>
    <div class="order-info">
      <div class="order-nav">订单信息</div>
      <div class="order-main">
        <div class="address">
          <p class="order-title">
            <span>收货地址</span>
            <b :style="{display: addresslist.length != 0 ? 'block':'none'}" @click="addnewAddress">新增收获地址</b>
          </p>
          <div class="addressbox">
            <p class="addbox" :style="{display: addresslist.length == 0 ? 'block':'none'}" @click="addnewAddress">
              <img src="../../assets/shop/add.png">
            </p>
            <div v-for="(item, index) in addresslist" :class="{addressitem: true, onselect: addressIdx == index}" @click="addressChange(index)">
              <img src="../../assets/shop/default.png" class="default_pic" :style="{display: item.type == 1 ? 'block':'none'}">
              <span>{{item.recname}} 收</span>
              <i class="defaultbtn" :style="{display: item.type == 0 ? '':'none'}" @click="defalutChange(index)">设为默认</i>
              <hr>
              <p>{{item.recphone}}</p>
              <p>中国 {{item.prov}} {{item.city}} {{item.country}}</p>
              <p>{{item.address}}</p>
              <div class="btngroup">
                <span class="modaddressbtn" @click.stop="editAddress(index)"></span>
                <span class="deladdressbtn" @click.stop="delAddress(index)"></span>
              </div>
              <img src="../../assets/shop/select.png" class="select_pic">
            </div>
          </div>
          <addresmodal v-if="showmodal" @closemodal="closeaddress" :isaddadress="is_addadress" :editadressdata="edit_adressdata" v-on:canclose="closeaddress"/>
        </div>
        <p class="order-title">
          <span>支付方式</span>
        </p>
        <div class="pay_way">在线支付（支付宝、微信扫码、京东支付）</div>
        <p class="order-title">
          <span>配送方式</span>
        </p>
        <div class="dc_way">整车由日日顺或顺丰物流配送 配件由顺丰快递单独配送</div>
        <div class="fapiao">
          <p class="order-title">
            <span>选择发票</span>
          </p>
          <div class="group">
            <label>发票信息</label>
            <p :class="{select: fapiaoIdx == 1}" @click="fapiaoChange(1)">电子</p>
            <p :class="{select: fapiaoIdx == 2}" @click="fapiaoChange(2)">纸质</p>
          </div>
          <h5>电子发票是税局认可的有效凭证，其法律效力、基本用途及使用规定同纸质发票，如需纸质票可自行下载打印。</h5>
          <div class="group">
            <label>发票抬头</label>
            <input type="text" placeholder="请填写单位名称" v-model="fapiaotitle">
          </div>
          <h5>发票内容：购买商品明细</h5>
        </div>
      </div>
    </div>
    <div class="pro-info">
      <div class="pro-nav">
        <p class="pinfo">商品信息</p>
        <p class="pprice">单价</p>
        <p class="pnum">数量</p>
        <p class="ptotal">小计</p>
      </div>
      <div class="order-list" v-for="(list, index) in plists">
        <div class="oinfo">
          <img :src="require('src/assets/shop/' + list.pic)">
          <p>
            <span>{{list.pname}}</span>
            <span>{{list.color}}</span>
            <span>{{list.size}}</span>
          </p>
        </div>
        <div class="oprice">{{list.price}}元</div>
        <div class="onum">&times;{{list.num}}</div>
        <div class="ototal">{{list.price * list.num}}元</div>
      </div>
      <div class="order-msg">
        <p>
          <span>商品合计：{{this.pricetotal}}元</span>
          <span>共计{{this.numtotal}}件商品</span>
        </p>
        <p><span>配送费用：0元</span></p>
        <p class="red"><span>费用总计：{{this.pricetotal}}元</span></p>
      </div>
    </div>
    <div class="order-btn">
      <p @click="addOrder">立即支付</p>
    </div>
    <com-foot/>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comFoot from 'src/components/foot'
  import addresmodal from 'src/components/addressmodal'
  export default {
    name: 'order',
    components: {
      comHeader, comFoot, addresmodal
    },
    data () {
      return {
        addresslist: [],
        addressIdx: 0,
        fapiaoIdx: 1,
        fapiaotitle: '',
        plists: [],
        pricetotal: 0,
        numtotal: 0,
        showmodal: false,
        is_addadress: false,
        edit_adressdata: null
      }
    },
    created () {
      this.getAddress()
      this.orderGoods()
    },
    methods: {
      getAddress () {
        if (sessionStorage.getItem('username')) {
          this.$http.post('api/user/useraddress', {username: sessionStorage.getItem('username')}).then((res) => {
            if (res.body.status !== 0) {
              this.addresslist = res.body
            }
          })
        } else {
          this.$router.push('/login')
        }
      },
      addressChange (index) {
        this.addressIdx = index
      },
      addnewAddress () {
        this.showmodal = true
        this.is_addadress = true
      },
      editAddress (index) {
        this.showmodal = true
        this.is_addadress = false
        this.edit_adressdata = this.addresslist[index]
      },
      delAddress (index) {
        this.$http.post('api/user/deleteaddress', {aid: this.addresslist[index].aid}).then((res) => {
          if (res.body.status === 1) {
            alert('删除成功')
            this.addresslist.splice(index, 1)
          } else {
            alert('删除失败，请重试')
          }
        })
      },
      closeaddress () {
        this.showmodal = false
        this.edit_adressdata = null
        this.getAddress()
      },
      defalutChange (index) {
        let _this = this
        this.$http.post('api/user/updatadefault', {aid: this.addresslist[index].aid, username: sessionStorage.getItem('username')}).then((res) => {
          if (res.body.status === 1) {
            alert('修改成功')
            _this.addresslist.map(function (item, idx) {
              if (index === idx) {
                _this.addresslist[idx].type = 1
              } else {
                _this.addresslist[idx].type = 0
              }
            })
          } else {
            alert('修改失败，请重试')
          }
        })
      },
      fapiaoChange (index) {
        this.fapiaoIdx = index
      },
      orderGoods () {
        var _this = this
        this.$http.post('/api/shop/orderGoods', {goods: this.$route.query.goods}).then((res) => {
          _this.plists = res.body
          _this.plists.map(function (item) {
            _this.pricetotal += item.price * item.num
            _this.numtotal += item.num
          })
        })
      },
      addOrder () {
        let _this = this
        _this.$http.post('/api/shop/addorder', {
          uname: sessionStorage.getItem('username'),
          ordernumber: new Date().getTime(),
          recname: _this.addresslist[_this.addressIdx].recname,
          createtime: new Date().getTime(),
          orderstatus: 0,
          recaddress: _this.addresslist[_this.addressIdx].prov + _this.addresslist[_this.addressIdx].city + _this.addresslist[_this.addressIdx].country,
          invoicetype: _this.fapiaoIdx,
          invoicetitle: _this.fapiaotitle,
          summoney: _this.pricetotal,
          recphone: _this.addresslist[_this.addressIdx].recphone,
          postcode: _this.addresslist[_this.addressIdx].postcode,
          telephone: _this.addresslist[_this.addressIdx].telephone,
          plists: _this.plists
        }).then((res) => {
          alert('下单成功！')
          this.$router.push({path: '/shop/pay', query: {oid: res.body.insertId}})
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .shop-process{
    width: 1140px;
    margin: 130px auto 40px;
    ul{overflow: hidden;}
    li{
      width: 33.33%;
      color: #a4a9ad;
      font-size: 14px;
      letter-spacing: 1px;
      line-height: 24px;
      text-align: center;
      border-left: 1px solid #979797;
      box-sizing: border-box;
      float: left;
      &:first-child{
        border-left: 0;
      }
      &.selected{color: #040404;}
    }
  }
  .order-info{
    width: 1198px;
    margin: 0 auto;
    border: 1px solid #D1D3D3;
    border-radius: 5px;
    .order-nav{
      height: 40px;
      background-color: #d1d3d3;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: #5c6670;
    }
    .order-main{
      padding: 25px 105px 30px;
      font-size: 14px;
    }
    .order-title{
      color: #212121;
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 20px;
      overflow: hidden;
      b{
        color: #df001f;
        font-weight: 400;
        float: right;
        cursor: pointer;
      }
    }
    .address{
      overflow: hidden;
      .addbox{
        width: 264px;
        height: 180px;
        padding: 25px;
        text-align: center;
        border: 1px dashed #E7E6E4;
        border-radius: 5px;
        margin-bottom: 19px;
        cursor: pointer;
        display: none;
        img{
          margin-top: 56px;
        }
      }
      .addressitem{
        width: 264px;
        height: 180px;
        color: #5c6670;
        padding: 25px;
        border: 1px solid #f0efee;
        border-radius: 5px;
        margin-bottom: 19px;
        position: relative;
        float: left;
        cursor: pointer;
        &:nth-of-type(3n-1){
          margin-left: 19px;
          margin-right: 19px;
        }
        &:hover .btngroup{display: block;}
        &:hover .defaultbtn{display: block;}
        &.onselect{
          background: #F0EFEE;
          .select_pic{display: block;}
        }
        .default_pic{
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
          display: none;
        }
        .select_pic{
          width: 40px;
          position: absolute;
          right: 0;
          bottom: 0;
          display: none;
        }
        .defaultbtn{
          width: 55px;
          height: 20px;
          border: 1px solid #d1d3d3;
          background: #fff;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #a4a9ad;
          font-style: normal;
          position: absolute;
          top: 24px;
          right: 30px;
          display: none;
        }
        hr{
          color: #d2d1d1;
          border: 0;
          border-top: 1px solid #d1d3d3;
          margin: 10px 0;
        }
        p{
          font-size: 14px;
          margin: 20px 0;
          overflow: hidden;
          height: 18px;
          line-height: 20px;
        }
        .btngroup{
          height: 20px;
          position: relative;
          display: none;
        }
        .modaddressbtn{
          width: 14px;
          height: 14px;
          background: url("../../assets/header-ico.png") 0 -101px;
          position: absolute;
          top: 3px;
          right: 40px;
        }
        .deladdressbtn{
          width: 14px;
          height: 14px;
          background: url("../../assets/header-ico.png") -21px -101px;
          position: absolute;
          top: 3px;
          right: 5px;
          z-index: 100;
        }
      }
    }
    .pay_way, .dc_way{
      color: #5c6670;
      font-size: 14px;
    }
    .fapiao{
      h5{
        color: #212121;
        font-weight: 400;
        font-size: 14px;
        line-height: 40px;
        letter-spacing: 1px;
        margin: 20px 0;
      }
      .group{
        overflow: hidden;
        label{
          color: #5c6670;
          line-height: 40px;
          float: left;
        }
        input{
          border: 1px solid #d1d3d3;
          border-radius: 5px;
          outline: 0;
          width: 296px;
          height: 36px;
          padding-left: 20px;
          margin-left: 20px;
        }
        p{
          width: 145px;
          height: 40px;
          color: #5c6670;
          line-height: 40px;
          border: 1px solid #d1d3d3;
          text-align: center;
          border-radius: 5px;
          margin-left: 20px;
          cursor: pointer;
          float: left;
          &.select{
            background: #F0EFEE;
            border-color: #F0EFEE;
          }
        }
      }
    }
  }
  .pro-info{
    width: 1198px;
    margin: 40px auto;
    border: 1px solid #D1D3D3;
    border-radius: 5px;
    .pro-nav{
      width: 100%;
      height: 40px;
      color: #5c6670;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      background: #d1d3d3;
      overflow: hidden;
      p{
        line-height: 40px;
        border-left: 1px solid #fff;
        float: left;
      }
      .pinfo{
        width: 680px;
        padding-left: 20px;
        text-align: left;
        border-left: 0;
      }
      .pprice{width: 200px;}
      .pnum{width: 97px;}
      .ptotal{width: 198px;}
    }
    .order-list{
      width: 1198px;
      height: 220px;
      border-bottom: 1px solid #D1D3D3;
      overflow: hidden;
      .oinfo{
        width: 700px;
        float: left;
        overflow: hidden;
        img{
          width: 180px;
          height: 180px;
          margin-left: 100px;
          margin-top: 20px;
          float: left;
        }
        p{
          width: 400px;
          line-height: 220px;
          text-align: center;
          color: #5c6670;
          font-size: 14px;
          float: left;
          span{margin: 0 5px;}
        }
      }
      .oprice, .onum, .ototal{
        color: #5C6670;
        font-size: 14px;
        text-align: center;
        line-height: 220px;
        float: left;
      }
      .oprice{width: 200px;}
      .onum{width: 97px;}
      .ototal{width: 198px;}
    }
    .order-msg{
      padding: 20px 0;
      p{
        margin: 15px;
        margin-right: 50px;
        overflow: hidden;
        &.red span{color: #df001f;}
        span{
          width: 170px;
          color: #212121;
          font-size: 16px;
          float: right;
        }
      }
    }
  }
  .order-btn{
    width: 1200px;
    margin: 0 auto;
    height: 70px;
    p{
      width: 200px;
      height: 40px;
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #df001f;
      margin-top: 15px;
      transition: all .2s ease-out;
      float: right;
      cursor: pointer;
      &:hover{
        background: #C8001C;
      }
    }
  }
</style>
