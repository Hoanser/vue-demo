<template>
	<div class="setinfo-wrap">
		<div class="head">个人信息</div>
		<div class="body">
			<div class="formbox">
				<p><label><span>昵称</span><input type="text" name="nickname" v-model="nickname"></label></p>
				<p><label><span>手机</span><input type="tel" name="phone" v-model="phone" maxlength="11"></label></p>
				<div class="gender-radio">
					<span>性别</span>
					<p>
						<span :data-index="1" class="radio" :class="{active:gender[1]}" @click="tabgender">男</span>
						<span :data-index="2" class="radio" :class="{active:gender[2]}" @click="tabgender">女</span>
						<span :data-index="0" class="radio" :class="{active:gender[0]}" @click="tabgender">保密</span>
					</p>
				</div>
				<p><label><span>个性签名</span><input type="text" name="signature" v-model="signature"></label></p>
				<p><label><span></span><button class="savebtn" @click="saveinfo">保存</button></label></p>
			</div>
		</div>
	</div>
</template>
<script>
 export default {
   data () {
     return {
       gender: [1, 0, 0],
       genderindex: 0,
       nickname: '',
       phone: '',
       signature: ''
     }
   },
   mounted: function () {
     this.$http.post('/api/user/selectuser', {
       username: sessionStorage.getItem('username')
     }, {}).then((response) => {
       this.genderindex = response.body.gender
       this.nickname = response.body.nickname
       this.phone = response.body.phone
       this.signature = response.body.signature
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
     tabgender (e) {
       this.gender = [0, 0, 0]
       this.genderindex = e.target.dataset.index
       this.gender[e.target.dataset.index] = 1
     },
     saveinfo () {
       var nickname = this.nickname
       var phone = this.phone
       var gender = this.genderindex
       var signature = this.signature
       this.$http.post('/api/user/updatauserinfo', {
         username: sessionStorage.getItem('username'),
         nickname: nickname,
         phone: phone,
         gender: gender,
         signature: signature
       }, {}).then((response) => {
         if (response.data.status === 1) {
           alert('修改成功')
         }
       })
     }
   }
 }
</script>
<style scoped rel="stylesheet/less" lang="less">
	p{
		margin: 0;
		padding: 0;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
	.setinfo-wrap{
		width: 880px;
	}
	.setinfo-wrap .head{
		height: 55px;
	    border-bottom: 1px solid #e0e1e1;
	    text-align: center;
	    line-height: 55px;
	    font-size: 18px;
	}
	.setinfo-wrap .body {
	    min-height: 455px;
	    background: #fff;
	}
	.setinfo-wrap .body .formbox input{
		width: 290px;
	    border: 1px solid #e6e6e6;
	    height: 36px;
	    line-height: 36px;
	    padding-left: 6px;
	    border-radius: 4px;
	}
	.formbox{
		width: 500px;
		margin: 0 auto;
		padding-top: 10%;
	    color: #888;
		label span{
			display: inline-block;
			width: 70px;
		    height: 36px;
		    line-height: 36px;
		    padding: 7px 0;
		    font-size: 14px;
		    text-align: right;
		    margin-right: 20px;
		}
	}
	.radio{
		display: inline-block;
		width: 42px;
    	height: 20px;
    	padding-left: 25px;
    	cursor: pointer;
    	background: url(../assets/mine/sexBg.png) no-repeat;
		background-size: contain;
	}
	.active{
		background: url(../assets/mine/sexBgActive.png) no-repeat;
		background-size: contain;
	}
	.gender-radio>span{
		display: inline-block;
		width: 70px;
	    height: 36px;
	    line-height: 36px;
	    padding: 7px 0;
	    font-size: 14px;
	    text-align: right;
	    margin-right: 20px;
	}
	.gender-radio>p{
		position: relative;
		top: 15px;
	}
	.gender-radio:after{
		content: "";
		display: block;
		clear: both;
	}
	.gender-radio p,.gender-radio span{
		float: left;
	}
	.savebtn{
		padding: 8px 15px;
		width: auto;
	    background: #df001f;
	    border: 1px solid #d94030;
	    color: #fff;
	    font-size: 14px;
	    text-align: center;
	    border-radius: 5px;
	    outline: none;
	    cursor: pointer;
	}
</style>
