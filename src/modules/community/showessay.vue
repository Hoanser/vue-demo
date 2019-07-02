<template>
  <div class="publish-wrap">
    <com-header/>
    <div class="publish">
      <div class="rightitems">
        <ul>
          <li @click="commentbtnS">回复</li>
          <li @click="showChosClassify">发帖</li>
          <li class="return" @click="goback"></li>
        </ul>
        <ul>
          <li class="gotop" @click="gotop"></li>
        </ul>
      </div>
      <div class="detailContent">
        <div class="pubLeft">
          <div class="avthordetail">
            <p class="avthorheadport" v-if="essaydetaile!=null"><img :src="require('../../assets/headport/'+essaydetaile.user.headport)"></p>
            <div class="avthorname">{{essaydetaile!=null?essaydetaile.user.nickname:''}}</div>
          </div>
        </div>
        <div class="pubRight">
          <div class="pubRight-head">
            <p class="pubRight-title">{{essaydetaile==null?'':essaydetaile.essay.etitle}}</p>
            <p class="pubRight-detail"><span>发表于：{{essaydetaile==null?'':essaydetaile.essay.etime | timeformat}}</span><span class="heatlevel-show">{{essaydetaile==null?'':essaydetaile.essay.eshow}}</span><span class="heatlevel-comment">{{essaydetaile==null?'':essaydetaile.essay.ecommit}}</span></p>
          </div>
          <div v-html="essaydetaile==null?'':essaydetaile.essay.econtent" class="pubRight-body">{{essaydetaile==null?'':essaydetaile.essay.econtent}}</div>
        </div>
      </div>
      <div class="detailComment">
        <div class="detailComment-head">{{(essaydetaile!=null&&essaydetaile.comment.length>0)?'最新评论':'无评论'}}</div>
        <div class="detailComment-body">
          <ul v-if="essaydetaile">
            <li class="commititem" v-for="(item,index) in essaydetaile.comment">
              <div class="pubLeft">
                <div class="avthordetail">
                  <p class="avthorheadport"><img :src="require('../../assets/headport/'+ item.headport)"></p>
                  <div class="avthorname">{{item.nickname||'未命名'}}</div>
                  <!-- <span class="louceng">{{index==0?'沙发':(index==1?'板凳':(index==2?'地板':(index+1+'楼')))}}</span> -->
                </div>
              </div>
              <div class="pubRight">
                <div class="pubRight-head">
                  <p class="pubRight-detail"><span>发表于：{{item.ctime | timeformat}}</span></p>
                </div>
                <div v-html="item.ccontent" class="pubRight-body">{{item.ccontent}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="commentpub">
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <div class="btngroup"><button @click="pubComment" :class="canClick==false?'nodisbalebtn':''">发表评论</button></div>
      </div>
      <chos-classify v-if="is_showclassify" @closebox="closeChosClassify"></chos-classify>
      <div class="commentmodal" v-show="is_showcommentS">
        <div class="commentbox">
          <div class="commentcontainer">
            <div class="commentbox-head"><span>回复帖子</span><i @click="closecommentS"></i></div>
            <div class="commentbox-body">
              <quill-editor v-model="contentS"
                            ref="myQuillEditor"
                            :options="editorOptionS"
                            @change="onEditorSChange($event)">
              </quill-editor>
              <div class="btngroup"><button @click="pubCommentS" :class="canClickS==false?'nodisbalebtn':''">发表评论</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <com-foot/>
  </div>
</template>

<script>
// import
import Vue from 'vue'
import chosClassify from 'src/components/chosclassify'
import VueQuillEditor from 'vue-quill-editor'
import comHeader from 'src/components/header'
import comFoot from 'src/components/foot'

// mount with global
Vue.use(VueQuillEditor)

export default {
  components: {
    comHeader, comFoot, chosClassify
  },
  data () {
    return {
      essaydetaile: null,
      content: '',
      contentS: '',
      editorOption: {
        placeholder: '评论'
      },
      editorOptionS: {
        placeholder: '评论'
      },
      canClick: false,
      canClickS: false,
      is_showclassify: false,
      is_showcommentS: false,
      eid: ''
    }
  },
  methods: {
    gotop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    showChosClassify () {
      this.is_showclassify = true
    },
    closeChosClassify () {
      this.is_showclassify = false
    },
    closecommentS () {
      this.is_showcommentS = false
    },
    pubComment () {
      var eid = this.essaydetaile.essay.eid
      var content = this.content
      if (this.canClick) {
        this.$http.post('/api/user/pubcomment', {
          eid: eid,
          username: sessionStorage.getItem('username'),
          content: content
        }, {}).then((response) => {
          if (response.data.status === 1) {
            this.upload()
            this.content = ''
            this.editorOption = {placeholder: '评论'}
            this.canClick = false
          }
        })
      }
    },
    commentbtnS () {
      this.is_showcommentS = true
    },
    pubCommentS () {
      var eid = this.essaydetaile.essay.eid
      var content = this.contentS
      if (this.canClickS) {
        this.$http.post('/api/user/pubcomment', {
          eid: eid,
          username: sessionStorage.getItem('username'),
          content: content
        }, {}).then((response) => {
          if (response.data.status === 1) {
            this.upload()
            this.contentS = ''
            this.is_showcommentS = false
            this.editorOptionS = {placeholder: '评论'}
            this.canClickS = false
          }
        })
      }
    },
    onEditorChange (e) {
      if (this.content.trim() !== '') {
        this.canClick = true
      } else {
        this.canClick = false
      }
    },
    onEditorSChange (e) {
      if (this.contentS.trim() !== '') {
        this.canClickS = true
      } else {
        this.canClickS = false
      }
    },
    upload () {
      var eid = this.eid
      this.$http.post('/api/user/showessay', {
        eid: eid
      }, {}).then((response) => {
        console.log(response)
        this.essaydetaile = response.body.data
      })
    },
    goback () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (!sessionStorage.getItem('username')) {
      this.$router.push('/login')
      return
    }
    if (this.$route.params) {
      this.eid = this.$route.params.eid
    }
    this.upload()
  },
  filters: {
    timeformat: function (value) {
      if (!value) return ''
      value = parseInt(value)
      var date = new Date(value)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return (Y + M + D + h + m + s)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.ql-container .ql-editor {
  height: 200px;
  min-height: 200px;
  padding-bottom: 1em;
}
.publish{
  padding-top: 50px;
}
.detailContent{
  width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
}
.pubLeft{
  background: #fbfbfb;
  width: 220px;
  box-sizing: border-box;
  border-right: 1px solid #d1d3d3;
  padding-top: 30px;
  padding-bottom: 30px;
}
.avthordetail{
  text-align: center;
  color: #939499;
  font-size: 20px;
  .avthorheadport{
    height: 84px;
    width: 84px;
    border-radius: 42px;
    overflow: hidden;
    margin: 0 auto 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.pubRight{
  background: #fff;
  width: 920px;
  box-sizing: border-box;
}
.pubRight-head{
  padding: 20px;
  padding-bottom: 0;
  .pubRight-title{
    color: #656566;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .pubRight-detail{
    border-bottom: 1px #e5e5e5 solid;
    font-size:14px;
    color: #aaa;
    padding-bottom: 5px;
    span{
      margin-right: 20px;
    }
    .heatlevel-show:before{
      content: '';
      display: inline-block;
      height: 16px;
      width: 20px;
      vertical-align: middle;
      margin-right: 5px;
      background: url(../../assets/community/pageview.png) no-repeat center;
      background-size: contain;
    }
    .heatlevel-comment:before{
      content: '';
      display: inline-block;
      height: 16px;
      width: 20px;
      vertical-align: middle;
      margin-right: 5px;
      background: url(../../assets/community/comment.png) no-repeat center;
      background-size: contain;
    }
  }
}
.pubRight-body{
  padding: 20px;
}
.detailComment{
  width: 1140px;
  margin: 20px auto;
  border-radius: 4px;
  .detailComment-head{
    background: #fff;
    color: #939499;
    border-bottom: 1px solid #e5e5e5;
    padding: 23px 0 10px 20px;
    font-size: 20px;
  }
  .commititem{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e5e5e5;
  }
  .louceng{
    font-size: 14px;
    color: #bbb;
  }
}
.commentpub{
  width: 1100px;
  margin: 0 auto;
  background: #fff;
  padding: 30px 20px;
}
.rightitems{
  position: fixed;
  left: 50%;
  top: 200px;
  margin-left: 590px;
  ul{
    border-radius: 4px;
    margin-top: 20px;
    overflow: hidden;
    color: #939499;
    line-height: 22px;
    li{
      background-color: #e9e9e9;
      width: 60px;
      height: 48px;
      cursor: pointer;
      line-height: 48px;
      border-bottom: 1px solid #dadada;
      text-align: center;
      transition: all .1s ease-out;
      -webkit-transition: all .1s ease-out;
      font-size: 14px;
      &:hover{
        color: #fff;
        background-color: #a4a9ad;
      }
      &.return{
        border-bottom: none;
        background: #e9e9e9 url(../../assets/community/return.png) center center no-repeat;
        background-size: 28px 28px;
        &:hover{
          background: #a4a9ad url(../../assets/community/returnActive.png) center center no-repeat;
          background-size: 32px 32px;
        }
      }
      &.gotop{
        border-bottom: none;
        background: #e9e9e9 url(../../assets/community/returnTop.png) center center no-repeat;
        background-size: 36px 20px;
        &:hover{
          background: #a4a9ad url(../../assets/community/returnTopActive.png) center center no-repeat;
          background-size: 40px 24px;
        }
      }
    }
  }
}
.commentmodal{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .commentbox{
    transform: translateY(40%);
    width: 680px;
    height: 400px;
    box-sizing: border-box;
    border-radius: 5px;
    background: rgba(0,0,0,.2);
    margin: 0 auto;
    padding: 10px;
    .commentcontainer{
      background: #fff;
      height: 100%;
      width: 100%;
      .commentbox-head{
        padding: 10px 10px 8px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 700;
        color: #939499;
        i{
          float: right;
          width: 20px;
          height: 20px;
          overflow: hidden;
          text-indent: -9999px;
          background: url(../../assets/community/cls.gif) no-repeat 0 0;
          cursor: pointer;
          &:hover{
            background-position: 0 -20px;
          }
        }
      }
    }
  }
}
.btngroup{
  text-align: center;
  margin-top: 20px;
  button{
    width: 100px;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    background-color: #e60e19;
    border: 1px solid #d94030;
    font-size: 14px;
    text-align: center;
    outline: none;
    cursor: pointer;
    &.nodisbalebtn{
      background-color: #bbb;
      border: none;
      cursor: default;
    }
  }
}
</style>
