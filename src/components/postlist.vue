<template>
  <div class="post-com">
    <ul>
      <li class="list-common" v-for="item in data">
        <router-link :to="{name: 'Showessay', params: {eid: item.eid}}">
          <div class="avatarbox">
            <a href="#" class="avatar">
              <div class="forum_avatar">
                <img :src="require('../assets/headport/' + item.headport)">
              </div>
            </a>
          </div>
          <div class="tl_ct">
            <a href="#" class="s xst">
              <span>{{item.etitle}}</span>
              <img src="../assets/community/digest_1.gif" alt="精华帖" :style="{display: item.eshow > 30 ? 'block':'none'}"/>
            </a>
            <div class="clear"></div>
            <div class="info">
              <a href="#" class="y comment">
                <em class="replies y">{{item.ecommit}}</em>
                <img src="../assets/community/comment.png" class="imagess">
              </a>
              <a href="#" class="y views comment">
                <em class="replies y">{{item.eshow}}</em>
                <img src="../assets/community/pageview.png" class="imagess">
              </a>
              <em>
                <a href="#">
                  <span class="add_v_box">{{item.nickname}}</span>
                </a>
              </em>
              <em>
                <span class="add_v_box">于 {{item.etime | timeformat}} 发表</span>
              </em>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['data'],
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

<style scoped rel="stylesheet/less" lang="less">
.post-com{
  li{
    padding: 20px 0px;
    border-top: 1px solid #eee;
    border-bottom: none;
    &:hover{
      background: #F2F2F2;
    }
    .avatarbox{
      float: left;
      .forum_avatar{
        position: relative;
        float: left;
        padding-left: 12px;
        >img{
          display: block;
          width: 42px;
          height: 42px;
          float: left;
          margin-right: 10px;
          border-radius: 100px;
        }
        .avt_v {
          position: absolute;
          bottom: 0;
          right: 10px;
          img{
            width: 19px;
            height: 19px;
          }
        }
      }
    }
    .tl_ct {
      margin-left: 52px;
      a:visited {
        color: #666;
      }
      a.xst {
        color: #313133;
        font-size: 16px;
      }
      a.xst span {
        float: left;
        max-width: 25em;
        margin-right: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
      }
      a.xst img {
        margin-left: 2px;
        float: left;
        margin-top: 2px;
      }
      .info{
        margin-top: -15px;
        font-size: 12px;
        em{
          margin-right: 20px;
          color: #aaa;
        }
        a {
          color: #aaa;
        }
        .replies {
          margin-right: 9px;
        }
        .comment .imagess {
          width: 16px;
          margin-right: 8px;
        }
      }
    }
  }
}
.clear {
    clear: both;
    height: 0;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.y {
    float: right;
}
em{
	font-style: normal;
}
</style>
