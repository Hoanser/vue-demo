<template>
  <div>
    <com-header></com-header>
    <com-carousel :slideImgs="slideImgs" :bodyWidth="bodyWidth"></com-carousel>
    <section class="grid">
      <ul class="grid_box">
        <li v-for="list in grids">
          <img :src="list.imgSrc">
          <h4>{{ list.title }}</h4>
          <p>{{ list.state }}</p>
        </li>
      </ul>
    </section>
    <com-foot></com-foot>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comCarousel from 'src/components/carousel'
  import comFoot from 'src/components/foot'
  export default {
    name: 'index',
    components: {
      comHeader, comCarousel, comFoot
    },
    data () {
      return {
        slideImgs: [
          {imgSrc: require('src/assets/shop/info-01014.png')},
          {imgSrc: require('src/assets/shop/info-02013.png')},
          {imgSrc: require('src/assets/shop/info-02011.png')},
          {imgSrc: require('src/assets/shop/info-02014.png')}
        ],
        bodyWidth: document.body.clientWidth,
        grids: [
          {imgSrc: require('src/assets/index/grid-1.jpg'), title: '嘘嘘扣2 产品详情', state: '了解嘘嘘扣2出色的设计与全新科技'},
          {imgSrc: require('src/assets/index/grid-2.jpg'), title: '产品材质安全', state: '嘘嘘扣使用医疗材质 放心无危害'},
          {imgSrc: require('src/assets/shop/info-01013.png'), title: '致妈咪', state: '全面了解宝宝动态'},
          {imgSrc: require('src/assets/index/grid-4.jpg'), title: '体温管家', state: '从呵护每一个宝贝开始'}
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .grid{
    padding: 1.3% 8px;
    .grid_box{
      overflow: hidden;
      li{
        width: 25%;
        box-sizing: border-box;
        text-align: center;
        float: left;
        cursor: pointer;
        &:hover img{
          box-shadow: 0 20px 40px -10px rgba(0,0,0,.2);
        }
        &:hover h4{
          color: #212121;
        }
        img{
          width: 95%;
          height: 228px;
          border-radius: 4px;
          transition: all .2s ease-out;
        }
        h4{
          width: 85%;
          font-size: 18px;
          color: #5c6670;
          text-align: left;
          margin: 12px auto 0;
          transition: all .2s ease-out;
        }
        p{
          width: 85%;
          font-size: 14px;
          color: #a4a9ad;
          text-align: left;
          margin: 3px auto 0;
        }
      }
    }
  }
</style>
