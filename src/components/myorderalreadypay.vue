
<template>
	<div class="orderdetail">
		<orderlist :ordertype="ordert" :orderdata="orderlist"></orderlist>
	</div>
</template>

<script>
	import orderlist from 'src/components/orderlist'
	export default {
	  data () {
	    return {
	      orderlist: [],
	      ordert: 1
	    }
	  },
	  components: { orderlist },
	  mounted: function () {
	    this.$http.post('api/user/getorder', {
	      username: sessionStorage.getItem('username'),
	      orderstatus: [1]
	    }, {}).then((response) => {
	      if (response.data.status === 1) {
	        this.orderlist = response.data.data
	      }
	    })
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

<style scoped src='assets/css/myorder.css'></style>
