<template>
	<div class="mine-wrap">
    <com-header/>
    <div id="minepage">
      <!--左边栏-->
      <div class="usertip">
        <div class="head" v-if="myport!==''"><img :src="require('../../assets/headport/'+myport)"/></div>
        <router-link v-for="(list,index) in listitle" :to="list.href">{{list.title}}</router-link>
      </div>

      <!--右边内容区-->
      <router-view @updata="uploadmsg" style="min-height: 450px"></router-view>
    </div>
    <com-foot/>
  </div>
</template>

<script>
import comHeader from 'src/components/header'
import comFoot from 'src/components/foot'
export default {
  components: {
    comHeader, comFoot
  },
  data () {
    return {
      myport: '',
      listitle: [{href: '/myorder', title: '我的订单'}, {href: '/myaddress', title: '我的地址'}, {href: '/setnewpwd', title: '修改密码'}, {href: '/setport', title: '修改头像'}, {href: '/setmyinfo', title: '个人信息'}]
    }
  },
  methods: {
    uploadmsg () {
      this.$http.post('/api/user/selectuser', {
        username: sessionStorage.getItem('username')
      }, {}).then((response) => {
        this.myport = response.body.headport
      })
    }
  },
  mounted: function () {
    this.uploadmsg()
  }
}

</script>

<style scoped>
.mine-wrap{
  margin: 100px auto 0;
}
.mine-wrap:after{
  content: "";
  display: block;
  clear: both;
}
#minepage{
	width: 1140px;
	margin: 0 auto;
	display: flex;
}
#minepage .usertip{
	width: 220px;
	background: #fff;
	margin-top: 55px;
	margin-right: 20px;
}
.usertip .head{
	padding: 18px 20px;
    width: 180px;
    height: 180px;
    border-radius: 5px;
}
.usertip .head img{
	height: 100%;
	width: 100%;
	border-radius: 4px;
}
.usertip a{
	display: block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #a4a9ad;
    text-align: center;
}
.usertip .router-link-active{
	background: #df001f;
    color: #fff;
}
</style>
