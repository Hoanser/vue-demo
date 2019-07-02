<template>
	<div class="address-wrap">
		<div class="head">收货地址</div>
		<div class="body">
			<div class="tip">已保存了{{addreslist.length>0?addreslist.length:0}}条地址，还能保存{{addreslist.length>0?(5-addreslist.length):5}}条收货地址</div>
			<div class="addressbox">
				<div v-if="addreslist.length>0" v-for="(address,index) in addreslist" :data-addressid="address.aid" :data-fullname="address.recname" :data-prov="address.prov" :data-city="address.city"  :data-country="address.country" :data-phone="address.recphone" :class="[{ onselect: address.type }, {addressitem: 1}]">
					<a href="#" class="set-default-btn" @click.prevent="changedefault" :data-index="index" v-if="!address.default" :data-addressid="address.aid">设为默认</a>
					<p class="fullname">{{address.recname}}</p>
					<hr>
					<p class="addressInfo"><span>{{address.prov+address.city+address.country}}</span></p>
					<p class="phone">{{address.recphone}}</p>
					<div class="btngroup">
						<span class="deladdressbtn icon-cross" @click="deleteAddress" :data-index="index" :data-addressid="address.aid"></span>
						<span class="modaddressbtn icon-edit" @click="editaddress" :data-index="index"></span>
					</div>
				</div>
				<div class="addressitem addaddressitem icon-plus" @click="addnewAddres" v-if="!addreslist.length||addreslist.length<5"></div>
			</div>
		</div>
		<addresmodal v-if="showmodal" @closemodal="closeaddress" :isaddadress="is_addadress" :editadressdata="edit_adressdata" v-on:canclose="closeaddress"></addresmodal>
	</div>
</template>
<script>
 import addresmodal from 'src/components/addressmodal'
 export default {
   components: { addresmodal },
   data () {
     return {
       addreslist: [],
       showmodal: false,
       is_addadress: false,
       edit_adressdata: null,
       userid: 1
     }
   },
   mounted: function () {
     this.uploadData()
   },
   created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
   },
   watch: {
    // 如果路由有变化，会再次执行该方法
   },
   methods: {
     uploadData: function () {
       this.$http.post('api/user/useraddress', {
         username: sessionStorage.getItem('username')
       }, {}).then((response) => {
         this.addreslist = response.body
       })
     },
     deleteAddress: function (e) {
       // this.addreslist.splice(e.target.dataset.index, 1)
       let aid = e.target.dataset.addressid
       this.$http.post('api/user/deleteaddress', {
         aid: aid
       }, {}).then((response) => {
         if (response.body.status === 1) {
           alert('删除成功')
         } else {
           alert('删除失败，请重试')
         }
         this.uploadData()
       })
     },
     addnewAddres: function () {
       this.showmodal = true
       this.is_addadress = true
     },
     closeaddress: function () {
       this.showmodal = false
       this.edit_adressdata = null
       this.uploadData()
     },
     changedefault: function (e) {
       let aid = e.target.dataset.addressid
       this.$http.post('api/user/updatadefault', {
         aid: aid,
         username: sessionStorage.getItem('username'),
         default: 1
       }, {}).then((response) => {
         if (response.body.status === 1) {
           alert('修改成功')
         } else {
           alert('修改失败，请重试')
         }
         this.uploadData()
       })
     },
     editaddress: function (e) {
       this.showmodal = true
       this.is_addadress = false
       this.edit_adressdata = this.addreslist[e.target.dataset.index]
     }
   }
 }
</script>
<style scoped>
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
	.address-wrap{
		width: 880px;
	}
	.address-wrap .head{
		height: 55px;
	    border-bottom: 1px solid #e0e1e1;
	    text-align: center;
	    line-height: 55px;
	    font-size: 18px;
	}
	.address-wrap .body {
	    min-height: 455px;
	}
	.address-wrap .body .tip {
	    height: 60px;
	    line-height: 60px;
	    font-size: 16px;
	    color: #a4a9ad;
	}
	.address-wrap .body .addressbox {
	    box-sizing: border-box;
	    overflow: auto;
	    min-height: 230px;
	}
	.address-wrap .body .addressbox .addressitem {
	    position: relative;
	    box-sizing: border-box;
	    float: left;
	    overflow: hidden;
	    width: 280px;
	    height: 170px;
	    margin-bottom: 25px;
	    padding: 25px;
	    border: 1px solid #f0efee;
	    border-radius: 5px;
	    color: #5c6670;
	    background: #fff;
	}
	.address-wrap .body .addressbox .addressitem .set-default-btn {
	    opacity: 0;
	    position: absolute;
	    width: 55px;
	    height: 20px;
	    right: 25px;
	    border: 1px solid #d1d3d3;
	    background: #fff;
	    line-height: 20px;
	    text-align: center;
	    font-size: 12px;
	    color: #a4a9ad;
	    transition: all .2s;
	    text-decoration: none;
	}
	.address-wrap .body .addressbox .addressitem:hover .set-default-btn {
		opacity: 0.7;
	}
	.address-wrap .body .addressbox .addressitem .set-default-btn:hover {
		opacity: 1;
	}
	.address-wrap .body .addressbox .addressitem.onselect {
	    background: #fff url(../assets/mine/default-icon.png) no-repeat right 0;
	}
	.address-wrap .body .addressbox .addressitem hr {
	    color: #d2d1d1;
	    border: 0;
	    border-top: 1px solid #d1d3d3;
	    margin: 10px 0;
	}
	.address-wrap .body .addressbox .addressitem p {
	    font-size: 14px;
	    overflow: hidden;
	    height: 20px;
	    line-height: 20px;
	}
	.address-wrap .body .addressbox .addressitem .addressInfo {
	    overflow: hidden;
	    height: 54px;
	    word-break: break-all;
	}
	.address-wrap .body .addressbox .addressitem .addressInfo span {
	    display: block;
	    margin-left: 35px;
	}
	.address-wrap .body .addressbox .addressitem p:before {
		content: "";
		display: inline-block;
		height: 15px;
		width: 15px;
		background: url(../assets/mine/iconlist.png) no-repeat;
		vertical-align: middle;
		margin-right: 20px;
		float: left;
		position: relative;
		top: 3px;
	}
	.address-wrap .body .addressbox .addressitem p.fullname:before {
		background: url(../assets/mine/iconlist.png) no-repeat 0 -22px;
	}
	.address-wrap .body .addressbox .addressitem p.addressInfo:before {
		background: url(../assets/mine/iconlist.png) no-repeat 0 -42px;
	}
	.address-wrap .body .addressbox .addressitem:nth-child(3n-1) {
	    margin-left: 20px;
	    margin-right: 20px;
	}
	.address-wrap .body .addressbox .addaddressitem {
	    position: relative;
	    float: left;
	    overflow: hidden;
	    border: 1px dashed #e7e6e4;
	    background: 0 0;
	    font-size: 80px;
	    text-align: center;
	    line-height: 120px;
	    cursor: pointer;
	    line-height: 140px;
	}
	.icon-plus:before{
		content: "";
		display: inline-block;
		height: 80px;
		width: 80px;
		background: url(../assets/mine/add-icon.png) no-repeat;
		background-size: contain;
	}
	.address-wrap .body .addressbox .addressitem .btngroup {
	    display: block;
	    position: absolute;
	    bottom: 30px;
	    right: 0;
	    padding-right: 20px;
	    opacity: 0;
	    transition: opacity .3s;
	}
	.address-wrap .body .addressbox .addressitem:hover .btngroup {
		opacity: 1;
	}
	.address-wrap .body .addressbox .addressitem .btngroup span {
	    display: block;
	    float: right;
	    width: 20px;
	    height: 20px;
	    margin-left: 10px;
	    cursor: pointer;
	    background: #fff url(../assets/mine/iconlist.png) no-repeat -16px -18px;
	    transition: all .1s;
	    opacity: 0.5;
	}
	.address-wrap .body .addressbox .addressitem .btngroup span.icon-cross{
		background: #fff url(../assets/mine/iconlist.png) no-repeat -16px 2px;
	}
	.address-wrap .body .addressbox .addressitem .btngroup span:hover {
		opacity: 1;
	}
</style>
