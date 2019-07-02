<template>
  <div class="shoppay">
    <com-header/>
    <div class="shop-process">
      <ul>
        <li>1.我的购物车</li>
        <li>2.填写订单信息</li>
        <li class="selected">3.完成支付</li>
      </ul>
    </div>
    <div class="pay-main">
      <div class="pay-title">
        <p>等待付款</p>
        <span>费用总计：{{this.summoney}}元</span>
      </div>
      <div class="pay-ways">
        <h3>选择支付方式</h3>
        <div class="way">
          <img src="../../assets/shop/zhifubao.png">
          <div class="way-info">
            <h4>支付宝 网页支付</h4>
            <h5>登录网页版支付宝支付</h5>
          </div>
        </div>
        <div class="way">
          <img src="../../assets/shop/wechat.png">
          <div class="way-info">
            <h4>微信 扫码支付</h4>
            <h5>使用微信手机客户端支付</h5>
          </div>
        </div>
        <div class="way">
          <img src="../../assets/shop/jdpay.png">
          <div class="way-info">
            <h4>京东支付</h4>
            <h5>使用京东支付支付</h5>
          </div>
        </div>
      </div>
      <div class="pay-btn">
        <p @click="payOrder">立即支付</p>
      </div>
    </div>
    <com-foot/>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comFoot from 'src/components/foot'
  export default {
    name: 'pay',
    components: {
      comHeader, comFoot
    },
    data () {
      return {
        summoney: 0
      }
    },
    created () {
      this.$http.get('/api/shop/payMoney', {'params': {oid: this.$route.query.oid}}).then((res) => {
        this.summoney = res.body[0].summoney
      })
    },
    methods: {
      payOrder () {
        this.$http.post('/api/shop/payOrder', {oid: this.$route.query.oid}).then((res) => {
          if (res.body === 'success') {
            alert('支付成功！')
            this.$router.push('/myorder/myorderall')
          }
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
  .pay-main{
    width: 1198px;
    margin: 0 auto 50px;
    border: 1px solid #D1D3D3;
    border-radius: 5px;
    .pay-title{
      height: 145px;
      background: #d1d3d3;
      overflow: hidden;
      p{
        color: #212121;
        font-size: 24px;
        line-height: 145px;
        margin-left: 40px;
        float: left;
      }
      span{
        color: #df001f;
        font-size: 20px;
        line-height: 145px;
        margin-right: 50px;
        float: right;
      }
    }
    .pay-ways{
      overflow: hidden;
      h3{
        color: #212121;
        font-size: 24px;
        font-weight: 400;
        margin: 50px 30px 20px;
      }
      .way{
        width: 378px;
        height: 110px;
        border-radius: 15px;
        margin-left: 15px;
        float: left;
        cursor: pointer;
        position: relative;
        background: #f0efee;
        transition: all .2s ease-out;
        &:hover{
          background: #d1d3d3;
        }
        img{
          width: 80px;
          margin: 15px 30px;
          float: left;
        }
        .way-info{
          margin: 30px 0;
          line-height: 25px;
          float: left;
          h4{
            color: #212121;
            font-size: 16px;
            font-weight: 400;
          }
          h5{
            font-size: 14px;
            color: #8c8c8c;
            font-weight: 400;
          }
        }
      }
    }
    .pay-btn{
      margin: 30px 20px;
      overflow: hidden;
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
  }
</style>
