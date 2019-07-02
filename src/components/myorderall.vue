<template>
	<div class="orderdetail" id="orderall">
		<orderlist :ordertype="ordert" :orderdata="orderlist" v-on:refresh="refreshlist"></orderlist>
	</div>
</template>

<script>
import orderlist from 'src/components/orderlist'
export default {
  data () {
    return {
      orderlist: [],
      ordert: 100
    }
  },
  mounted: function () {
    this.refreshlist()
  },
  components: { orderlist },
  methods: {
    refreshlist: function () {
      this.$http.post('api/user/getorder', {
        username: sessionStorage.getItem('username'),
        orderstatus: [0, 1, 2, 3, 4, 5]
      }, {}).then((response) => {
        if (response.data.status === 1) {
          this.orderlist = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped src='assets/css/myorder.css'></style>
