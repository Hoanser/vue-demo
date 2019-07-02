<template>
  <div class="community">
    <com-header/>
    <div class="left">
      <com-carousel :slideImgs="bannerImgs" :bodyWidth="bodyWidth"/>
      <div class="slide-box">
        <img src="../../assets/community/leftBtn.png" class="leftBtn" @click="slideMove('left')">
        <ul class="slide-main" :style="{left: left + 'px'}">
          <li class="slide-item" v-for="(item, index) in slideImgs">
            <img :src="item.imgSrc" class="slide_img">
            <div class="item-info">
              <p><span>{{item.num}}</span>人正在强势围观</p>
              <h3>{{item.title}}</h3>
              <h4>
                <img :src="item.headimg" class="head_img">
                <span>{{item.uname}}</span>
              </h4>
            </div>
          </li>
        </ul>
        <img src="../../assets/community/rightBtn.png" class="rightBtn" @click="slideMove('right')">
      </div>
      <div class="post-list">
        <div class="threadlist">
          <div class="m-subnav">
            <div class="subnav-left">
              <a href="#" class="subnavTittle">最热新帖</a>
            </div>
          </div>
          <post-list :data="indexData"/>
        </div>
      </div>
    </div>
    <my-board @showbox="showChosClassify"/>
    <chos-classify v-show="is_showclassify" @closebox="closeChosClassify"/>
    <com-foot/>
  </div>
</template>

<script>
  import comHeader from 'src/components/header'
  import comFoot from 'src/components/foot'
  import comCarousel from 'src/components/carousel'
  import myBoard from 'src/components/myboard'
  import postList from 'src/components/postlist'
  import chosClassify from 'src/components/chosclassify'
  export default {
    components: {
      comHeader, comFoot, comCarousel, myBoard, postList, chosClassify
    },
    data () {
      return {
        bannerImgs: [
          {imgSrc: require('../../assets/community/bannerc.png')},
          {imgSrc: require('../../assets/community/bannerc1.jpg')},
          {imgSrc: require('../../assets/community/bannerc2.jpg')}
        ],
        bodyWidth: 790,
        slideImgs: [
          {imgSrc: require('../../assets/community/slide-1.jpg'), num: 1341, title: '阳春三月，花样年华', headimg: require('../../assets/community/001.jpg'), uname: '醉意红尘'},
          {imgSrc: require('../../assets/community/slide-2.jpg'), num: 1222, title: '拍拍我的女王', headimg: require('../../assets/community/002.jpg'), uname: '天堂桔子'},
          {imgSrc: require('../../assets/community/slide-1.jpg'), num: 1341, title: '小白牛的日常', headimg: require('../../assets/community/001.jpg'), uname: '醉意红尘'},
          {imgSrc: require('../../assets/community/slide-2.jpg'), num: 1222, title: '拍拍我的女王', headimg: require('../../assets/community/002.jpg'), uname: '天堂桔子'},
          {imgSrc: require('../../assets/community/slide-1.jpg'), num: 1341, title: '小白牛的日常', headimg: require('../../assets/community/001.jpg'), uname: '醉意红尘'},
          {imgSrc: require('../../assets/community/slide-2.jpg'), num: 1222, title: '拍拍我的女王', headimg: require('../../assets/community/002.jpg'), uname: '天堂桔子'},
          {imgSrc: require('../../assets/community/slide-1.jpg'), num: 1341, title: '小白牛的日常', headimg: require('../../assets/community/001.jpg'), uname: '醉意红尘'},
          {imgSrc: require('../../assets/community/slide-2.jpg'), num: 1222, title: '拍拍我的女王', headimg: require('../../assets/community/002.jpg'), uname: '天堂桔子'}
        ],
        left: 0,
        indexData: [],
        is_showclassify: false
      }
    },
    created () {
      this.$http.get('/api/comm/indexData').then((res) => {
        this.indexData = res.body
      })
    },
    methods: {
      slideMove (dir) {
        if (dir === 'left') {
          if (this.left < 0) {
            this.left += 270
          }
        } else {
          if (this.left > -270 * (this.slideImgs.length - 3)) {
            this.left -= 270
          }
        }
      },
      showChosClassify () {
        this.is_showclassify = true
      },
      closeChosClassify () {
        this.is_showclassify = false
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .community{
    width: 1140px;
    margin: 100px auto 0;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
    .left{
      width: 790px;
      margin-bottom: 50px;
      float: left;
      .banner{
        height: 340px;
        border-radius: 4px;
      }
    }
    .slide-box{
      width: 100%;
      height: 340px;
      margin-top: 20px;
      position: relative;
      overflow: hidden;
      .leftBtn, .rightBtn{
        width: 38px;
        position: absolute;
        top: 125px;
        cursor: pointer;
        z-index: 10;
      }
      .leftBtn{left: 0;}
      .rightBtn{right: 0;}
      .slide-main{
        width: 5000px;
        height: 340px;
        position: absolute;
        transition: all .5s ease;
        li{
          width: 270px;
          height: 340px;
          float: left;
          position: relative;
        }
        .slide_img{
          width: 250px;
          height: 340px;
          border-radius: 4px;
          cursor: pointer;
        }
        .item-info{
          color: #fff;
          padding-left: 20px;
          position: absolute;
          bottom: 0;
          cursor: pointer;
          p{
            font-size: 12px;
            margin: 6px 0;
            span{
              font-size: 18px;
            }
          }
          h3{
            width: 220px;
            font-size: 18px;
            font-weight: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          h4{
            .head_img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            span{
              font-size: 12px;
              font-weight: 400;
              margin-left: 6px;
            }
          }
        }
      }
    }
  }
  .threadlist{
    border-radius: 4px;
    padding: 26px 26px 0;
    background: #fff;
    margin-top: 20px;
    .m-subnav {
      font-size: 14px;
      position: relative;
      padding: 0 0 15px 0;
      &:after{
        content: "";
        display: block;
        clear: both;
      }
      .subnav-left {
        float: left;
        .subnavTittle {
          font-size: 20px;
          color: #333333;
        }
      }
      .subnav-right {
        float: right;
        white-space: nowrap;
        opacity: 0.6;
        .xw1 {
          color: #d20d18;
        }
        a{
          color: #939499;
          margin-left: 20px;
          &:hover{
            color:#d20d18;
          }
        }
      }
    }
  }
</style>
