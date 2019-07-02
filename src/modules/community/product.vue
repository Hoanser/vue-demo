<template>
  <div class="comm-product">
    <com-header/>
    <div class="left">
      <div class="head">
        <div class="top">
          <img src="../../assets/community/001.jpg">
          <div class="head-info">
            <h2>产品讨论区</h2>
            <p>贴数：{{this.recordCount}}</p>
            <h5>版主： 134289, Version丶丶, @电商芥末, PewPeww, wus7788</h5>
          </div>
        </div>
        <div class="hr"></div>
        <div class="bottom">
          <p :class="{onselect: label == 0}" @click="labelChange(0)">全部</p>
          <p :class="{onselect: label == 1}" @click="labelChange(1)">体验分享</p>
          <p :class="{onselect: label == 2}" @click="labelChange(2)">产品疑问</p>
        </div>
      </div>
      <div class="post-list">
        <div class="threadlist">
          <div class="m-subnav">
            <div class="subnav-left">
              <a href="#" class="subnavTittle">产品新帖</a>
            </div>
          </div>
          <post-list :data="data"/>
          <div class="pagination">
            <ul>
              <li @click="pageChange('prov')">&lt;</li>
              <li v-for="page in pageCount" :class="{onselect: pageNum == page}" @click="pageChange(page)">{{page}}</li>
              <li @click="pageChange('next')">&gt;</li>
            </ul>
            <div class="go">
              <input type="text" v-model="gopage">
              <p @click="goPage">Go</p>
            </div>
          </div>
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
        is_showclassify: false,
        modal: 1,
        label: 0,
        recordCount: 0,
        pageNum: 1,
        pageCount: 0,
        gopage: '',
        data: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      showChosClassify () {
        this.is_showclassify = true
      },
      closeChosClassify () {
        this.is_showclassify = false
      },
      getData () {
        let _this = this
        this.$http.get('/api/comm/disData', {'params': {pageNum: _this.pageNum, modal: _this.modal, label: _this.label}}).then((res) => {
          _this.recordCount = res.body[0].recordCount
          _this.pageCount = res.body[0].pageCount
          _this.data = res.body[0].data
        })
      },
      labelChange (label) {
        this.label = label
        this.pageNum = 1
        this.getData()
      },
      pageChange (page) {
        if (page === 'prov') {
          this.pageNum > 1 && this.pageNum--
        } else if (page === 'next') {
          this.pageNum < this.pageCount && this.pageNum++
        } else {
          this.pageNum = page
        }
        this.getData()
      },
      goPage () {
        this.pageNum = this.gopage
        this.getData()
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .comm-product{
    width: 1140px;
    margin: 100px auto 0;
    &:after{
      content: "";
      display: block;
      clear: both;
    }
    .left{
      width: 790px;
      margin-bottom: 40px;
      float: left;
      .head{
        width: 750px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 20px;
        .top{
          overflow: hidden;
          padding-bottom: 20px;
        }
        img{
          border-radius: 4px;
          width: 76px;
          height: 76px;
          float: left;
        }
        .head-info{
          line-height: 22px;
          margin-left: 20px;
          float: left;
          h2{
            color: #939499;
            font-size: 18px;
            font-weight: 400;
          }
          p{
            color: #5c6670;
            font-size: 12px;
            margin: 6px 0;
          }
          h5{
            color: #939499;
            font-size: 12px;
            font-weight: 400;
          }
        }
        .hr{
          border-top: 1px solid #eee;
        }
        .bottom{
          margin-top: 10px;
          overflow: hidden;
          p{
            width: 70px;
            height: 30px;
            color: #999A9F;
            font-size: 12px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #A4A9AD;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
            float: left;
            &.onselect{
              color: #fff;
              background: #5C6670;
              border-color: #5C6670;
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
  .pagination{
    padding: 20px 0;
    border-top: 1px solid #eee;
    text-align: right;
    overflow: hidden;
    ul{
      display: inline-block;
      overflow: hidden;
      li{
        width: 30px;
        height: 26px;
        line-height: 26px;
        color: #707174;
        font-size: 14px;
        text-align: center;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        margin: 4px;
        float: left;
        cursor: pointer;
        &.onselect{
          border: 0;
          &:hover{
            color: #707174;
          }
        }
        &:hover{
          color: #d20d18;
        }
      }
    }
    .go{
      margin-left: 15px;
      display: inline-block;
      input{
        width: 30px;
        height: 26px;
        line-height: 26px;
        color: #707174;
        font-size: 14px;
        text-align: center;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        margin: 4px;
        float: left;
      }
      p{
        color: #707174;
        margin-top: 8px;
        float: left;
        cursor: pointer;
      }
    }
  }
</style>
