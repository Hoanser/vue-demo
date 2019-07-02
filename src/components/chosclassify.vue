
<template>
	<div class="classify-box">
		<div class="classify-container">
			<h3 class="title"><span>论坛导航</span><i @click="closebox"></i></h3>
			<div class="chos-box">
				<p class="publishbtnbox"><button class="publishbtn" :class="{canpublish:canpublish}" @click="publishtopic">发新贴</button></p>
				<ul class="chos-forum">
					<li v-for="(item,index) in chosforumlist" :data-index="index" :class="{curforum:index==curforumindex}" @click="chosforum">{{item.title}}</li>
				</ul>
				<ul class="secondli">
					<li v-for="(item,index) in chosforumlist[curforumindex].labelist" :data-index="index" :class="{curlabel:index==curlabelindex}" @click="choslabel">{{item.title}}</li>
				</ul>
				<ul>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        curforumindex: 0,
        curlabelindex: -1,
        canpublish: false,
        chosforumlist: [
          {
            id: 1,
            title: '产品专区',
            labelist: [
              {
                id: 1,
                title: '体验分享'
              },
              {
                id: 2,
                title: '产品疑问'
              }
            ]
          },
          {
            id: 2,
            title: '宝妈专区',
            labelist: [
              {
                id: 3,
                title: '经验分享'
              },
              {
                id: 4,
                title: '宝妈求助'
              }
            ]
          }
        ]
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
    },
    props: ['ordertype', 'orderdata'],
    methods: {
      chosforum: function (e) {
        if (e.target.dataset.index !== this.curforumindex) {
          this.curforumindex = e.target.dataset.index
          this.curlabelindex = -1
          this.canpublish = false
        }
      },
      choslabel: function (e) {
        this.curlabelindex = e.target.dataset.index
        this.canpublish = true
      },
      closebox: function () {
        this.$emit('closebox')
      },
      publishtopic: function () {
        var modal = this.chosforumlist[this.curforumindex].id
        var label = this.chosforumlist[this.curforumindex].labelist[this.curlabelindex].id
        if (this.canpublish) {
          this.$router.push({name: 'Publish', params: { modal: modal, label: label }})
        }
      }
    }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
	.classify-box{
		height: 435px;
		width: 662px;
		border-radius: 10px;
		background: rgba(0,0,0,0.2);
		position: fixed;
    z-index: 201;
    left: 50%;
    top: 120px;
    box-sizing: border-box;
    padding: 12px;
    margin-left: -331px;
    .classify-container{
      background: #fff;
      height: 100%;
    .title{
      padding: 10px 10px 8px;
        height: 20px;
        line-height: 20px;
        span{
          float: left;
          font-size: 14px;
          font-weight: 700;
          color: #939499;
        }
        i{
          float: right;
          width: 20px;
          height: 20px;
          overflow: hidden;
          text-indent: -9999px;
          background: url(../assets/community/cls.gif) no-repeat 0 0;
          cursor: pointer;
          &:hover{
              background-position: 0 -20px;
            }
        }
    }
    .publishbtnbox{
      text-align: right;
      margin-top: 10px;
      margin-bottom: 8px;
      .publishbtn{
        height: 30px;
        width: 60px;
        color: #fff;
        cursor: default;
        border: 1px solid #9F9F9F;
        background: linear-gradient(to bottom, #F7F7F7, #DDDDDD);
        border-radius: 4px;
        &.canpublish{
          cursor: pointer;
          background: #e60e19;
          border: transparent;
        }
      }
    }
    .chos-box{
      padding: 0 10px;
      &:after{
        content: "";
        display: block;
        clear: both;
      }
      ul{
        width: 33.33%;
        height: 310px;
        float: left;
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        padding: 6px;
        &.chos-forum{
          li{
            background: url(http://bbs.niu.com/static/image/common/arrow.gif) right -33px no-repeat;
          }
        }
        &.secondli{
          border-left: none;
          border-right: none;
        }
        li{
          height: 25px;
          line-height: 25px;
            white-space: nowrap;
            padding: 0 4px;
            text-decoration: none;
            color: #939499;
            border: solid #FFF;
            border-width: 1px 0;
            font-size: 12px;
            cursor: pointer;
            &:hover{
              background-color: #F3F3F3;
              color: #626366;
            }
            &.curforum,&.curlabel{
              background-color: #EEE;
              color: #666;
              font-weight: 700;
            }
        }
      }
    }
    }
	}
</style>
