<template>
  <div class="shopcart">
    <com-header/>
    <div class="shop-process">
      <ul>
        <li class="selected">1.我的购物车</li>
        <li>2.填写订单信息</li>
        <li>3.完成支付</li>
      </ul>
    </div>
    <div class="cart-dtl">
      <div class="cart-nav">
        <p class="pinfo">商品信息</p>
        <p class="pprice">单价</p>
        <p class="pnum">数量</p>
        <p class="ptotal">小计</p>
        <p class="pdel">操作</p>
      </div>
      <div class="cart-list" v-for="(list, index) in plists">
        <div class="cinfo">
          <input type="checkbox" :value="list.cid" v-model="checked">
          <img :src="require('src/assets/shop/' + list.pic)">
          <p>
            <span>{{list.pname}}</span>
            <span>{{list.color}}</span>
            <span>{{list.size}}</span>
          </p>
        </div>
        <div class="cprice">{{list.price}}元</div>
        <div class="cnum">
          <div class="num_box">
            <span class="csub" @click="numChange('sub', index)">-</span>
            <input type="text" :value="list.num" v-model="list.num">
            <span class="cadd" @click="numChange('add', index)">+</span>
          </div>
        </div>
        <div class="ctotal">
          {{(list.price * list.num).toFixed(2)}}元
        </div>
        <div class="cdel">
          <span @click="deletelist(index)"></span>
        </div>
      </div>
    </div>
    <div class="cart-total">
      <router-link :to="{path: '/shop/order', query: {goods: checked}}"><p>下一步</p></router-link>
      <span>商品合计（不含运费）：{{this.total.toFixed(2)}}元</span>
    </div>
    <com-foot/>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comFoot from 'src/components/foot'
  export default {
    name: 'detail',
    components: {
      comHeader, comFoot
    },
    data () {
      return {
        plists: [],
        total: 0,
        checked: [13]
      }
    },
    created () {
      if (sessionStorage.getItem('username')) {
        let _this = this
        this.$http.post('/api/shop/cart', {uname: sessionStorage.getItem('username')}).then((res) => {
          _this.plists = res.body
          res.body.map(function (item, index) {
            _this.checked[index] = item.cid
          })
        })
      } else {
        this.$router.push('/login')
      }
    },
    methods: {
      numChange (type, index) {
        if (type === 'sub') {
          if (this.plists[index].num > 1) {
            this.plists[index].num--
          }
        } else {
          this.plists[index].num++
        }
        this.totalChange()
        this.$http.post('/api/shop/numchange', {cid: this.plists[index].cid, num: this.plists[index].num})
      },
      deletelist (index) {
        let cid = this.plists[index].cid
        this.$http.post('/api/shop/delcart', {cid: cid}).then((res) => {
          if (res.body === 'success') {
            alert('删除成功')
          } else {
            alert('删除失败')
          }
        })
        this.plists.splice(index, 1)
      },
      totalChange () {
        var _this = this
        _this.total = 0
        _this.plists.map(function (item) {
          _this.total += item.price * item.num
        })
      }
    },
    watch: {
      plists () {
        this.totalChange()
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
  .cart-dtl{
    width: 1200px;
    margin: 0 auto;
    .cart-nav{
      width: 100%;
      height: 40px;
      color: #5c6670;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background: #d1d3d3;
      overflow: hidden;
      p{
        width: 124px;
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
    }
    .cart-list{
      width: 1198px;
      height: 220px;
      border: 1px solid #D1D3D3;
      border-top: 0;
      overflow: hidden;
      input[type=checkbox] {
        position: relative;
        width: 36px;
        height: 36px;
        visibility: hidden;
        margin-left: 25px;
        margin-top: 92px;
        float: left;
        cursor: pointer;
      }
      input[type=checkbox]::before,
      input[type=checkbox]::after {
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        position: absolute;
        display: block;
        content: '';
        visibility: visible;
      }
      input[type=checkbox]::before {
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        background: url("../../assets/header-ico.png") 0 -52px;
      }
      input[type=checkbox]:checked::after {
        background: url("../../assets/header-ico.png") -37px -52px;
      }
      .cinfo{
        width: 700px;
        float: left;
        overflow: hidden;
        img{
          width: 180px;
          height: 180px;
          margin-left: 50px;
          margin-top: 20px;
          float: left;
        }
        p{
          width: 400px;
          line-height: 220px;
          text-align: center;
          color: #FF0000;
          font-size: 14px;
          float: left;
          span{margin: 0 5px;}
        }
      }
      .cprice, .cnum, .ctotal, .cdel{
        width: 124px;
        height: 220px;
        line-height: 220px;
        text-align: center;
        color: #5c6670;
        font-size: 14px;
        float: left;
      }
      .ctotal{color: #FF0000;}
      .num_box{
        margin-left: 8px;
        margin-top: 94px;
        overflow: hidden;
        span{
          width: 30px;
          height: 30px;
          line-height: 30px;
          background: #fafafa;
          border: 1px solid #E8E8E8;
          float: left;
          cursor: pointer;
        }
        input{
          width: 45px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid #E8E8E8;
          border-left: 0;
          border-right: 0;
          float: left;
          outline: 0;
        }
      }
      .cdel{
        position: relative;
        span{
          width: 15px;
          height: 15px;
          background: url("../../assets/header-ico.png") -80px -62px;
          position: absolute;
          top: 103px;
          cursor: pointer;
        }
      }
    }
  }
  .cart-total{
    width: 1200px;
    margin: 40px auto;
    overflow: hidden;
    span{
      color: #212121;
      font-size: 16px;
      line-height: 40px;
      float: right;
    }
    p{
      width: 125px;
      height: 40px;
      text-align: center;
      color: #fff;
      line-height: 40px;
      border-radius: 20px;
      background: #df001f;
      margin-left: 30px;
      cursor: pointer;
      float: right;
      transition: all .2s ease-out;
      &:hover{background: #C8001C;}
    }
  }
</style>
