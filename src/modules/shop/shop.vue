<template>
  <div class="shop">
    <com-header></com-header>
    <com-carousel :slideImgs="slideImgs" :bodyWidth="bodyWidth"></com-carousel>
    <div class="escooter">
      <h3>嘘嘘扣</h3>
      <p>XuxuKou</p>
      <div class="escooter_img">
        <router-link :to="{path: '/shop/detail', query: {gid: 1}}">
          <div class="escooter_item">
            <img :src="require('../../assets/shop/prod-0105.jpg')">
            <span class="img_name">{{goods[0].pname}}</span>
            <span class="img_price">{{goods[0].price}}起</span>
          </div>
        </router-link>
        <router-link :to="{path: '/shop/detail', query: {gid: 2}}">
          <div class="escooter_item">
            <img :src="require('../../assets/shop/prod-0202.jpg')">
            <span class="img_name">{{goods[1].pname}}</span>
            <span class="img_price">{{goods[1].price}}起</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="goodsbox">
      <div class="goodlists wrap">
        <h1 class="title">全部商品 <span>All Products</span></h1>
        <div class="goods">
          <div class="good" v-for="(good, index) in goods">
            <router-link :to="{path: '/shop/detail', query: {gid: index+1}}">
              <img :src="require('../../assets/shop/prod-0' + (index+1) + '01.jpg')">
              <h4>{{good.pname}}</h4>
              <p>{{good.pdescribe}}</p>
              <span>￥{{good.price}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <com-foot></com-foot>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comCarousel from 'src/components/carousel'
  import comFoot from 'src/components/foot'
  export default {
    name: 'shop',
    components: {
      comHeader, comCarousel, comFoot
    },
    data () {
      return {
        slideImgs: [
          {imgSrc: require('src/assets/shop/banner1.png')},
          {imgSrc: require('src/assets/shop/banner2.jpg')},
          {imgSrc: require('src/assets/shop/banner3.jpg')}
        ],
        bodyWidth: document.body.clientWidth,
        goods: [{}, {}]
      }
    },
    created () {
      this.$http.get('/api/shop/goodlist').then((res) => {
        this.goods = res.body
      })
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .shop .banner{
    height: 500px;
  }
  .escooter{
    width: 1140px;
    text-align: center;
    overflow: hidden;
    margin: 30px auto;
    h3{
      color: #212121;
      font-size: 36px;
      font-weight: 400;
      line-height: 50px;
    }
    p{
      color: #5C6670;
      font-size: 18px;
    }
    .escooter_item{
      margin: 0 105px;
      float: left;
      &:hover .img_name, &:hover .img_price{color: #A4A9AD;}
    }
    .escooter_img{
      float: left;
      overflow: hidden;
      img{
        width: 360px;
        height: 234px;
        display: block;
      }
      .img_name{
        color: #5c6670;
        font-size: 17px;
        line-height: 36px;
        transition: all .2s ease-out;
        float: left;
      }
      .img_price{
        color: #5c6670;
        font-size: 17px;
        line-height: 36px;
        transition: all .2s ease-out;
        float: right;
      }
    }
  }
  .goodsbox{background: #f5f5f5}
  .goodlists{
    padding: 70px 0 140px;
    .title{
      color: #212121;
      font-size: 24px;
      font-weight: 400;
      margin-left: 20px;
      span{
        color: #5c6670;
        font-size: 17px;
        margin-left: 15px;
      }
    }
    .goods{
      margin: 15px 0;
      overflow: hidden;
      .good{
        width: 262.5px;
        margin: 15px 15px 40px;
        background: #fff;
        float: left;
        transition: all .2s ease-out;
        &:hover{box-shadow: 0 20px 40px -10px rgba(0,0,0,.2)}
        &:hover h4{color: #a4a9ad}
        img{
          width: 262.5px;
          height: 252.5px;
          padding-top: 10px;
        }
        h4{
          color: #5c6670;
          font-size: 17px;
          font-weight: 400;
          line-height: 34px;
          margin-left: 20px;
          transition: all .2s ease-out;
        }
        p{
          color: #a4a9ad;
          font-size: 14px;
          line-height: 30px;
          margin-left: 20px;
        }
        span{
          color: #df001f;
          font-size: 17px;
          float: right;
          margin-right: 20px;
          line-height: 26px;
          margin-bottom: 7px;
        }
      }
    }
  }
</style>
