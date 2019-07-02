<template>
	<div class="orderGroup-list">
		<div v-for="item in orderdata" class="orderItem" v-if="orderdata.length>0">
			<div class="orderItem-status">
				<span class="littleStatus">收货人: {{item.recname}}</span>
				<span class="littleStatus">下单时间: {{item.createtime | timeformat}}</span>
				<button href="#" class="active" v-if="!item.orderstatus">立即支付</button><button href="#" class="default" v-if="!item.orderstatus">取消订单</button>
				<button href="#" class="active" v-if="item.orderstatus==1" @click="salesReturn" :data-oid="item.orderid">退货</button><button href="#" class="default" v-if="item.orderstatus==1" @click="exchangeGoods" :data-oid="item.orderid">换货</button>
			</div>
			<div class="orderItem-original">
				<span>原始单号: {{item.ordernumber}}</span>
				<span>下单时间: {{item.createtime | timeformat}}</span>
			</div>
			<div class="orderItem-title">
				<ul>
					<li>订单编号: {{item.ordernumber}}</li>
					<li>订单金额: {{item.summoney}}</li>
					<li>订单状态: {{item.orderstatus==0?'等待付款':(item.orderstatus==1?'已付款':(item.orderstatus==2?'退货中':(item.orderstatus==3?'换货中':(item.orderstatus==4?'已退货':'已换货'))))}}</li>
				</ul>
			</div>
			<div class="orderItem-product" v-for="orderItem in item.prolist">
				<ul>
					<li class="orderItem-product-img"><img :src="require('../assets/shop/'+orderItem.productimg)" v-if="orderItem.productimg!=''||orderItem.productimg!==undefined"></li><!--这里的src应为 orderItem.productimg-->
					<li class="orderItem-product-info">
						<p class="orderItem-product-info-name">{{orderItem.productname}} {{orderItem.productsize}} {{orderItem.productcolor}}</p>
					</li>
					<li class="orderItem-product-qty">{{orderItem.count}}</li>
					<li class="orderItem-product-price">{{orderItem.productprize}}</li>
					<li class="orderItem-product-option"><a href="#">订单详情</a></li>
				</ul>
			</div>
		</div>
		<div v-if="!(orderdata.length>0)" class="nodatabox">没有订单数据</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
  },
  props: ['ordertype', 'orderdata'],
  methods: {
    salesReturn: function (e) {
      if (confirm('您确定要退货吗？')) {
        this.$http.post('api/user/salesreturn', {
          orderid: e.target.dataset.oid
        }, {}).then((response) => {
          if (response.data.status === 1) {
            this.$emit('refresh')
          }
        })
      }
    },
    exchangeGoods: function (e) {
      if (confirm('您确定要换货吗？')) {
        this.$http.post('api/user/exchangegoods', {
          orderid: e.target.dataset.oid
        }, {}).then((response) => {
          if (response.data.status === 1) {
            this.$emit('refresh')
          }
        })
      }
    }
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

<style scoped>
	a{text-decoration: none}
	ul,li,p{
	  list-style: none;
	  padding: 0;
	  margin: 0;
	}
	button{
		border: none;
	}
	.orderGroup-list {
	    position: relative;
	    padding: 0;
	    min-height: 300px;
	}
	.nodatabox{
		text-align: center;
		color: #aaa;
		font-size: 20px;
	}
	.orderItem {
	    padding-top: 35px;
	    padding-left: 20px;
	    padding-right: 20px;
	    border-bottom: 30px solid #F6F6F8;
	    background-color: #fff;
	}
	.orderItem .orderItem-status {
	    color: #5c6670;
	}
	.orderItem .orderItem-status .littleStatus {
	    font-size: 20px;
	    margin-right: 60px;
	}
	.orderItem .orderItem-status button.active {
	    background-color: #df001f;
	    color: #fff;
	    margin-right: 48px;
	}
	.orderItem .orderItem-status button.default {
	}
	.orderItem .orderItem-status button {
	    float: right;
	    display: inline-block;
	    text-align: center;
	    width: 70px;
	    height: 30px;
	    line-height: 30px;
	    border-radius: 59px;
	    background-color: #f0efee;
	    font-size: 12px;
	    color: #5c6670;
	    margin-left: 10px;
	    outline: none;
	    cursor: pointer;
	}
	.orderItem .orderItem-original {
	    height: 50px;
	    line-height: 50px;
	    font-size: 12px;
	    color: #bfc1c1;
	    overflow: hidden;
	}
	.orderItem .orderItem-original span {
	    margin-right: 20px;
	}
	.orderItem .orderItem-title {
	    height: 50px;
	    background-color: #f6f6f6;
	    font-size: 12px;
	    color: #5c6670;
	    border-radius: 8px;
	    margin-bottom: 6px;
	}
	.orderItem .orderItem-title ul {
	    height: 16px;
	}
	.orderItem .orderItem-title ul>li {
	    margin-top: 18px;
	    float: left;
	    height: 100%;
	    padding: 0 26px;
	    text-align: center;
	    border-right: 1px solid #979797;
	}
	.orderItem .orderItem-product {
	    height: 160px;
	    margin-bottom: 20px;
	}
	.orderItem .orderItem-product ul {
	    height: 100%;
	}
	.orderItem .orderItem-product ul>li {
	    height: 130px;
	    padding-top: 30px;
	    float: left;
	    font-size: 18px;
	    color: #5c6670;
	    text-align: center;
	}
	.orderItem .orderItem-product ul .orderItem-product-img {
	    width: 160px;
	    height: 160px;
	    padding-top: 0;
	    border-radius: 8px;
	    background-color: #f6f6f6;
	}
	.orderItem .orderItem-product ul .orderItem-product-img img{
		width: 100%;
		height: 100%;
	}
	.orderItem .orderItem-product ul .orderItem-product-info {
	    width: 250px;
	    padding-left: 20px;
	    text-align: left;
	}
	.orderItem .orderItem-product ul .orderItem-product-qty {
	    width: 50px;
	}
	.orderItem .orderItem-product ul .orderItem-product-price {
	    width: 180px;
	}
	.orderItem .orderItem-product ul .orderItem-product-option {
	    width: 180px;
	}
	.orderItem .orderItem-product ul .orderItem-product-option a {
	    display: block;
	    width: 160px;
	    height: 30px;
	    line-height: 30px;
	    border-radius: 59px;
	    background-color: #f0efee;
	    margin: 0 auto 20px;
	    font-size: 12px;
	    color: #5c6670;
	}
</style>
