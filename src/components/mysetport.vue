<template>
	<div class="setport">
		<div class="head">修改头像</div>
		<div class="body">
			<div class="imgbox">
				<p class="portbox" v-if="myport!==''"><img :src="require('../assets/headport/'+myport)"></p>
				<p><button class="chosbtn canclick">选择图片<input type="file" class="filebtn" @change="showPic"></button><button class="savebtn" :class="{canclick:canUpload}" @click="uploadPort">保存头像</button></p>
			</div>
		</div>
	</div>
</template>
<script>
 export default {
   data () {
     return {
       myport: '',
       canUpload: false
     }
   },
   mounted: function () {
     this.refresh()
   },
   created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
   },
   watch: {
    // 如果路由有变化，会再次执行该方法
   },
   methods: {
     refresh () {
       this.$http.post('/api/user/selectuser', {
         username: sessionStorage.getItem('username')
       }, {}).then((response) => {
         this.myport = response.body.headport
         this.canUpload = false
       })
     },
     showPic () {
       this.canUpload = true
       var file = document.querySelector('.filebtn').files[0]
       if (file) {
         this.myport = file.name
       }
     },
     uploadPort () {
       this.$http.post('/api/user/updataport', {
         username: sessionStorage.getItem('username'),
         headport: this.myport
       }, {}).then((response) => {
         if (response.data.status === 1) {
           alert('修改成功')
           this.$emit('updata')
           this.refresh()
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
	.setport{
		width: 880px;
	}
	.setport .head{
		height: 55px;
	    border-bottom: 1px solid #e0e1e1;
	    text-align: center;
	    line-height: 55px;
	    font-size: 18px;
	}
	.setport .body {
	    min-height: 455px;
	}
	.body{
		background: #fff;
	}
	.imgbox{
		width: 200px;
		margin: 0 auto;
		padding-top: 10%;
		text-align: center;
		p{
			text-align: center;
		}
	}
	.portbox{
		height: 150px;
		width: 150px;
		border-radius: 75px;
		overflow: hidden;
		margin: 0 auto 50px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.savebtn,.chosbtn{
		padding: 8px 15px;
		width: auto;
	    background: #aaa;
	    border: 1px solid #aaa;
	    color: #fff;
	    font-size: 14px;
	    text-align: center;
	    border-radius: 5px;
	    outline: none;
	}
	.chosbtn{
		margin-right: 10px;
		position: relative;
		input{
			height: 100%;
			width: 100%;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	.canclick{
		background: #df001f;
	    border: 1px solid #d94030;
	    cursor: pointer;
	}
</style>
