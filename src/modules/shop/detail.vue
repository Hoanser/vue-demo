<template>
  <div class="detail">
    <com-header></com-header>
    <div class="good-dtl wrap">
      <div class="left">
        <div class="img-big">
          <img v-if="goodinfo.dtlimg" :src="require('src/assets/shop/' + goodinfo.dtlimg[activeIdx])">
        </div>
        <div class="img-small">
          <b class="prev" @click="prev"></b>
          <b class="next" @click="next"></b>
          <img v-for="(list, index) in goodinfo.dtlimg" :src="require('src/assets/shop/' + list)" :data-index="index" :class="{active: activeIdx == index}" @click="handleimg">
        </div>
      </div>
      <div class="right">
        <h2>{{goodinfo.pname}}</h2>
        <div class="group price">
          <label>价格</label>
          <span>￥{{goodinfo.price}}</span>
        </div>
        <div class="group color">
          <label>颜色</label>
          <p v-for="(list, index) in goodinfo.color" :data-index="index" :class="{active: colorIdx == index}" @click="colorSwitch">{{list}}</p>
        </div>
        <div class="group size">
          <label>尺码</label>
          <p v-for="(list, index) in goodinfo.size" :data-index="index" :class="{active: sizeIdx == index}" @click="sizeSwitch">{{list}}</p>
        </div>
        <div class="group num">
          <label>数量</label>
          <ul>
            <li class="num_sub" @click="numChange('sub')">-</li>
            <li class="num_txt"><input type="text" :value="num" v-model="num"></li>
            <li class="num_add" @click="numChange('add')">+</li>
          </ul>
        </div>
        <div class="group">
          <label></label>
          <button class="go_cart" @click="addCart"><b></b>加入购物车</button>
        </div>
      </div>
    </div>
    <div class="good-info">
      <ul class="info-nav">
        <li data-index="infoone" @click="navTab">商品介绍</li>
        <li data-index="infotwo" @click="navTab">详细参数</li>
        <li data-index="infothree" @click="navTab">售后政策</li>
      </ul>
      <div class="info-main">
        <img v-for="list in goodinfo[infoIdx]" :src="require('src/assets/shop/' + list)">
      </div>
    </div>
    <com-foot></com-foot>
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
        goodinfo: {},
        activeIdx: 0,
        infoIdx: 'infoone',
        colorIdx: 0,
        sizeIdx: 0,
        num: 1
      }
    },
    created () {
      this.$http.get('/api/shop/detail', {'params': {'gid': this.$route.query.gid}}).then((res) => {
        var color = []
        var size = []
        var dtlimg = []
        var infoone = []
        var infotwo = []
        var infothree = []
        color = res.body[0].color.split(',')
        size = res.body[0].size.split(',')
        dtlimg = res.body[0].dtlimg.split(',')
        infoone = res.body[0].infoone.split(',')
        infotwo = res.body[0].infotwo.split(',')
        infothree = res.body[0].infothree.split(',')
        res.body[0].color = color
        res.body[0].size = size
        res.body[0].dtlimg = dtlimg
        res.body[0].infoone = infoone
        res.body[0].infotwo = infotwo
        res.body[0].infothree = infothree
        this.goodinfo = res.body[0]
      })
    },
    methods: {
      handleimg (e) {
        this.activeIdx = e.target.getAttribute('data-index')
      },
      prev () {
        if (--this.activeIdx < 0) {
          this.activeIdx = this.goodinfo.dtlimg.length - 1
        }
      },
      next () {
        if (++this.activeIdx >= this.goodinfo.dtlimg.length) {
          this.activeIdx = 0
        }
      },
      colorSwitch (e) {
        this.colorIdx = e.target.getAttribute('data-index')
      },
      sizeSwitch (e) {
        this.sizeIdx = e.target.getAttribute('data-index')
      },
      numChange (type) {
        if (type === 'sub') {
          if (this.num > 1) {
            this.num--
          }
        } else {
          this.num++
        }
      },
      navTab (e) {
        this.infoIdx = e.target.getAttribute('data-index')
      },
      addCart () {
        if (sessionStorage.getItem('username')) {
          this.$http.post('/api/shop/addcart', {
            uname: sessionStorage.getItem('username'),
            pname: this.goodinfo.pname,
            price: this.goodinfo.price,
            color: this.goodinfo.color[this.colorIdx],
            size: this.goodinfo.size[this.sizeIdx],
            pic: 'prod-0' + this.goodinfo.pid + '01.jpg',
            num: this.num
          }).then((res) => {
            if (res.body === 'success') {
              this.$router.push('/shop/cart')
            }
          })
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .good-dtl{
    padding: 95px 15px;
    box-sizing: border-box;
    overflow: hidden;
    .left{
      width: 555px;
      float: left;
      .img-big{
        width: 555px;
        height: 555px;
        position: relative;
        img{
          width: 555px;
          height: 555px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .img-small{
        width: 444px;
        height: 73px;
        margin: 15px auto 0;
        padding: 4px;
        border: 1px solid #d1d3d3;
        border-radius: 4px;
        position: relative;
        .prev, .next{
          width: 13px;
          height: 22px;
          background: url('../../assets/header-ico.png') -56px 0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .prev{left: -40px}
        .next{
          background: url('../../assets/header-ico.png') -104px 0;
          right: -40px;
        }
        .prev:hover{background: url('../../assets/header-ico.png') -80px 0;}
        .next:hover{background: url('../../assets/header-ico.png') -128px 0;}
        img{
          width: 73px;
          height: 73px;
          margin-right: 1px;
          float: left;
          &.active{opacity: .6;}
        }
      }
    }
    .right{
      width: 495px;
      height: 655px;
      padding: 60px 0 0 90px;
      float: left;
      h2{
        color: #212121;
        font-size: 23px;
        font-weight: 400;
        margin-bottom: 80px;
      }
      .group{
        margin-bottom: 30px;
        overflow: hidden;
        label{
          width: 76px;
          height: 40px;
          color: #212121;
          font-size: 14px;
          line-height: 40px;
          float: left;
        }
        p{
          min-width: 36px;
          height: 36px;
          border-radius: 4px;
          border: solid 1px #d1d3d3;
          margin-right: 10px;
          text-align: center;
          line-height: 20px;
          color: #5c6670;
          font-size: 13px;
          padding: 6px;
          box-sizing: border-box;
          transition: border-color .2s ease-out;
          float: left;
          cursor: pointer;
          &.active{
            border: solid 2px #5c6670;
            padding: 5px;
          }
          &:hover{
            border-color: #5c6670;
          }
        }
        ul{
          width: 120px;
          height: 38px;
          border: 1px solid #d1d3d3;
          border-radius: 4px;
          float: left;
        }
        li{
          width: 39px;
          height: 38px;
          background: #e3e6e9;
          line-height: 36px;
          font-size: 13px;
          text-align: center;
          float: left;
          cursor: pointer;
          &.num_txt{width: 40px;}
          &.num_txt input{
            width: 40px;
            height: 36px;
            text-align: center;
            background: #fff;
            outline: 0;
          }
        }
        .go_cart{
          width: 135px;
          height: 36px;
          box-sizing: border-box;
          line-height: 36px;
          color: #fff;
          font-size: 15px;
          text-align: center;
          border-radius: 4px;
          background: #DF001F;
          padding-left: 28px;
          transition: all .2s ease-out;
          position: relative;
          outline: none;
          cursor: pointer;
          b{
            width: 16px;
            height: 16px;
            background: url("../../assets/header-ico.png") -25px -22px;
            position: absolute;
            top: 13px;
            left: 20px;
          }
        }
      }
      .price{
        span{
          color: #DF001F;
          font-size: 24px;
          line-height: 40px;
        }
      }
    }
  }
  .good-info{
    margin-bottom: 60px;
    .info-nav{
      width: 100%;
      height: 50px;
      text-align: center;
      margin-bottom: 50px;
      li{
        width: 196px;
        line-height: 50px;
        color: #70747D;
        font-size: 16px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .info-main{
      text-align: center;
      img{width: 1440px;}
    }
  }
</style>
