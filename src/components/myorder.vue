<template>
	<div class="ordercontent">
		<div class="orderGroup-title">
			<div class="title-box">
				<router-link v-for="list in listitle" class="orderGroup-title-item" :to="/myorder/+list.href">{{list.title}}<span class="arrow-up" v-if=""><i></i></span></router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	      listitle: [{href: 'myorderall', title: '全部订单'}, {href: 'myorderwaitpay', title: '待付款'}, {href: 'myorderalreadypay', title: '已完成'}, {href: 'myorderchange', title: '退换货'}]
	    }
	  },
	  mounted () {
	    this.$router.push('/myorder/myorderall')
	    if (!sessionStorage.getItem('username')) {
	      this.$router.push('/login')
	    }
	  },
	  created () {
	    // 组件创建完后获取数据，
	    // 此时 data 已经被 observed 了
	  },
	  watch: {
	    // 如果路由有变化，会再次执行该方法
	  },
	  methods: {
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
	.ordercontent{
		width: 900px;
	    float: left;
	    min-height: 500px;
	    position: relative;
	}
	.ordercontent .orderGroup-title{
		height: 25px;
    	margin-bottom: 30px;
	}
	.ordercontent .orderGroup-title .title-box{
		width: 897px;
	    height: 100%;
	    font-size: 18px;
	}
	.ordercontent .orderGroup-title .title-box>a{
		position: relative;
	    color: #a4a9ad;
	    height: 100%;
	    line-height: 25px;
	    float: left;
	    width: 24%;
	    text-align: center;
	    border-right: 1px solid #979797;
	    cursor: pointer;

	}
	.ordercontent .orderGroup-title .title-box>a.router-link-active{
		color: #040404;
	}
	.ordercontent .orderGroup-title .title-box>a .arrow-up {
		display: none;
	    position: absolute;
	    bottom: -30px;
	    left: 50%;
	    margin-left: -8px;
	    height: 0;
	    width: 0;
	    font-size: 0;
	    line-height: 0;
	    border-color: transparent transparent #fff;
	    border-style: dashed dashed solid;
	    border-width: 10px;
	}
	.ordercontent .orderGroup-title .title-box>a.router-link-active .arrow-up{
		display: block;
	}
	.ordercontent .orderGroup-title .title-box>a .arrow-up i {
		box-sizing: content-box;
	    position: absolute;
	    top: -9px;
	    left: -10px;
	    display: block;
	    height: 0;
	    width: 0;
	    font-size: 0;
	    line-height: 0;
	    border-color: transparent transparent #fff;
	    border-style: dashed dashed solid;
	    border-width: 10px;
	}

</style>
