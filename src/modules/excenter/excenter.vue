<template>
	<div>
    <com-header/>
    <div class="excenter">
      <h1>线下门店</h1>
      <baidu-map class="map" :center="{lng: 119.734496, lat: 30.243353}" :zoom="9" @ready="handler" scroll-wheel-zoom=true>
        <bm-marker :position="{lng: 120.161315, lat: 30.237839}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        <bm-marker :position="{lng: 119.960954, lat: 30.27136}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        <bm-marker :position="{lng: 121.557832, lat: 29.879272}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      </baidu-map>
    </div>
    <com-foot/>
  </div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import comHeader from 'src/components/header'
import comFoot from 'src/components/foot'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'TwnEdajtuelb3AsQup2vSqeImfdAapCx'
})

export default {
  components: {
    comHeader, comFoot
  },
  data () {
    return {
      center: {lng: 0, lat: 0}
    }
  },
  methods: {
    handler () {
      this.lng = 116.404
      this.lat = 39.915
    }
  }
}
</script>

<style scoped>
	.excenter h1{
		font-size: 48px;
	    font-weight: 500;
	    text-align: center;
	    color: #212121;
	    margin-top: 90px;
	    margin-bottom: 60px;
	    line-height: 67px;
	}

	.map {
	  margin: 0 auto 40px;
	  width: 1140px;
	  height: 600px;
	}
</style>
