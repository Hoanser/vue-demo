<template>
  <div class="banner">
    <ul class="slide_main" :style="{ width: bodyWidth * slideImgs.length + 'px', left: - bodyWidth * index + 'px' }">
      <li v-for="(item, index) in slideImgs" :style="{ width: bodyWidth + 'px' }">
        <img :src="item.imgSrc">
      </li>
    </ul>
    <ul class="slide_idx">
      <li v-for="(item, idx) in slideImgs" @click="choose(idx)" :class="{active: index == idx}"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    props: ['slideImgs', 'bodyWidth'],
    data () {
      return {
        index: 0,
        timer: null,
        lastimg: true
      }
    },
    mounted () {
      var self = this
      window.onresize = function () {
        self.bodyWidth = document.body.clientWidth
      }
      this.automove()
    },
    methods: {
      choose: function (index) {
        this.stopauto()
        this.index = index
        this.automove()
      },
      automove: function () {
        var self = this
        this.timer = setInterval(function () {
          if (self.index < self.slideImgs.length - 1) {
            self.index += 1
          } else {
            self.index = 0
          }
        }, 5000)
      },
      stopauto: function () {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .banner{
    width: 100%;
    height: 859px;
    overflow: hidden;
    position: relative;
    .slide_main{
      position: absolute;
      overflow: hidden;
      transition: all .6s ease;
      li{
        float: left;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .slide_idx{
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 15px;
      li{
        width: 22px;
        padding: 4px;
        display: inline-block;
        cursor: pointer;
        &:before{
          content: '';
          width: 100%;
          height: 2px;
          background: #d1d3d3;
          display: block;
          transition: all .2s ease-out;
        }
        &:hover:before{
          background: #666666;
        }
        &.active:before{
          background: #DF001F;
        }
      }
    }
  }
</style>
