<template>
	<div id="addressmodal" class="address-edit-wrap">
		<form>
			<div class="title" v-if="isaddadress">新增收货地址</div>
			<div class="title" v-else>修改收货地址</div>
			<ul class="left">
				<li class="row">
					<label>
						<span>*收货人</span>
						<input type="text" name="fullName" placeholder="请填写收货人姓名" :value="addressdata.recname" v-model="formdata.recname">
					</label>
				</li>
				<li class="row">
					<label>
						<span>固定电话</span>
						<input type="text" name="mobile" placeholder="请填写收货人手机号" :value="addressdata.telephone" v-model="formdata.telephone">
					</label>
				</li>
				<li class="row">
					<label>
						<span>*手机号码</span>
						<input type="text" name="phone" placeholder="请填写收货人固定电话" :value="addressdata.recphone" v-model="formdata.recphone">
					</label>
				</li>
			</ul>
			<ul class="right">
				<li class="row">
					<span>*所在地区</span>
					<span id="J_province" class="address-select select-province">
            <input type="text" readonly name="province_show" placeholder="省份/自治区" class="sele-input-province" :value="addressdata!=null?addressdata.prov:''" @click="toggleprovlist">
            <i></i>
          </span>
					<ul class="select-list province-content" v-show="is_showprov==1">
						<li v-for="(prov,index) in provlist" @click="chosprov" :data-index="index" :data-provid="prov.provinceid">{{prov.province}}</li>
					</ul>
					<span id="J_city" class="address-select select-city">
            <input type="text" readonly name="city_show" placeholder="城市/地区" class="sele-input-city" :value="addressdata!=null?addressdata.city:''" @click="togglecitylist">
            <i></i>
          </span>
					<ul class="select-list city-content" v-show="is_showcity==1">
						 <li v-for="(city,index) in citylist" @click="choscity" :data-index="index" :data-cityid="city.cityid">{{city.city}}</li>
					</ul>
					<span id="J_street" class="address-select select-street">
            <input type="text" readonly name="street_show" placeholder="区/县" class="sele-input-street" :value="addressdata!=null?addressdata.country:''" @click="togglecountylist">
            <i></i>
          </span>
					<ul class="select-list street-content" v-show="is_showcounty==1">
						<li v-for="(county,index) in countylist" @click="choscounty" :data-index="index" :data-areaid="county.areaid">{{county.area}}</li>
					</ul>
				</li>
				<li class="row">
					<label>
						<span>*详细地址</span>
						<input type="text" name="addressLine1" placeholder="请填写收货人详细地址" class="detail-address-inp" :value="addressdata.address" v-model="formdata.address">
					</label>
				</li>
				<li class="row">
					<label>
						<span>邮政编码</span>
						<input name="postalCode" placeholder="请填写邮政编码" class="address-code" :value="addressdata.postcode" v-model="formdata.postcode">
						<span>地址标签</span>
						<input type="text" name="addressName" placeholder="如“家”、“公司”" :value="addressdata.addresslabel" v-model="formdata.label">
					</label>
				</li>
			</ul>
			<div class="btn-wrap">
				<span id="J_cancel" class="btn-style cacel-btn" @click="closemodal">取消</span>
				<span class="btn-style save-btn" v-if="isaddadress" @click="savenewaddress">保存收货地址</span>
				<span class="btn-style save-btn" v-else @click="updataAddress">修改地址</span>
			</div>
		</form>
	</div>
</template>

<script>
export default {
  data () {
    return {
      provlist: [],
      citylist: [],
      countylist: [],
      showdownlist: [0, 0, 0],
      is_showprov: 0,
      is_showcity: 0,
      is_showcounty: 0,
      addressdata: {},
      userid: 1,
      formdata: {
        aid: '',
        recname: '',
        telephone: '',
        recphone: '',
        address: '',
        postcode: '',
        label: '',
        prov: '',
        provinceid: '',
        city: '',
        cityid: '',
        country: '',
        countryid: '',
        userid: ''
      }
    }
  },
  mounted: function () {
    this.$http.get('api/user/prov', {}, {}).then((response) => {
      this.provlist = JSON.parse(response.bodyText)
    })
    if (this.editadressdata) {
      this.addressdata = this.editadressdata
      this.formdata = this.editadressdata
      this.$http.get('api/user/cities', {'params': { 'provinceid': this.formdata.provinceid }}, { emulateJSON: true }).then((response) => {
        this.citylist = response.data
      })
      this.$http.get('api/user/areas', {'params': { 'cityid': this.formdata.cityid }}, { emulateJSON: true }).then((response) => {
        this.countylist = response.data
      })
    }
  },
  props: ['isaddadress', 'editadressdata'],
  methods: {
    closemodal: function () {
      this.$emit('closemodal')
    },
    toggleprovlist: function () {
      this.is_showcity = 0
      this.is_showcounty = 0
      this.is_showprov = 1 - this.is_showprov
    },
    togglecitylist: function () {
      this.is_showcity = 1 - this.is_showcity
      this.is_showcounty = 0
      this.is_showprov = 0
    },
    togglecountylist: function () {
      this.is_showcity = 0
      this.is_showcounty = 1 - this.is_showcounty
      this.is_showprov = 0
    },
    chosprov: function (e) {
      let provid = e.target.dataset.provid
      this.is_showprov = false
      this.addressdata.prov = this.provlist[e.target.dataset.index].province
      this.formdata.provinceid = this.provlist[e.target.dataset.index].provinceid
      this.$http.get('api/user/cities', {'params': { 'provinceid': provid }}, { emulateJSON: true }).then((response) => {
        this.citylist = response.data
      })
    },
    choscity: function (e) {
      let cityid = e.target.dataset.cityid
      this.is_showcity = false
      this.addressdata.city = this.citylist[e.target.dataset.index].city
      this.formdata.cityid = this.citylist[e.target.dataset.index].cityid
      this.$http.get('api/user/areas', {'params': { 'cityid': cityid }}, { emulateJSON: true }).then((response) => {
        this.countylist = response.data
      })
    },
    choscounty: function (e) {
      // let areaid = e.target.dataset.areaid
      this.is_showcounty = false
      this.addressdata.country = this.countylist[e.target.dataset.index].area
      this.formdata.countryid = this.countylist[e.target.dataset.index].areaid
    },
    savenewaddress: function () { // 保存新地址
      this.formdata.prov = this.addressdata.prov
      this.formdata.city = this.addressdata.city
      this.formdata.area = this.addressdata.country
      this.formdata.username = sessionStorage.getItem('username')
      this.$http.post('api/user/addnewaddress', this.formdata, {}).then((response) => {
        console.log(response)
        if (response.body.status) {
          alert('保存成功')
          this.$emit('canclose')
        } else {
          alert('保存失败')
        }
      })
    },
    updataAddress: function () { // 修改地址
      this.formdata.prov = this.addressdata.prov
      this.formdata.city = this.addressdata.city
      this.formdata.area = this.addressdata.country
      this.$http.post('api/user/updataddress', this.formdata, {}).then((response) => {
        console.log(response)
        if (response.body.status) {
          alert('修改成功')
          this.$emit('canclose')
        } else {
          alert('修改失败')
        }
      })
    }
  }
}
</script>

<style scoped>
	*{
		padding: 0;
		margin: 0;
		vertical-align: baseline;
	}
	ul,li{
		list-style: none;
	}
	.address-edit-wrap {
	    position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 10;
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,.8);
	    color: #555;
	}
	.address-edit-wrap form {
	    width: 870px;
	    height: 340px;
	    margin: 100px auto 0;
	    border-radius: 5px;
	    background: #fff;
	}
	.address-edit-wrap form .title {
	    line-height: 75px;
	    text-align: center;
	    font-size: 18px;
	}
	.address-edit-wrap form .left {
	    float: left;
	    width: 300px;
	}
	.address-edit-wrap form .row {
	    position: relative;
	    height: 60px;
	}
	.address-edit-wrap form .row span {
	    display: block;
	    float: left;
	    width: 100px;
	    margin-right: 30px;
	    text-align: right;
	    line-height: 30px;
	}
	.address-edit-wrap form .row input {
	    display: block;
	    float: left;
	    width: 150px;
	    height: 30px;
	    border: 1px solid #d1d3d3;
	    border-radius: 5px;
	    text-indent: 1em;
	}
	.address-edit-wrap form .right {
	    margin-left: 300px;
	}
	.address-edit-wrap form .row .address-select {
	    display: block;
	    position: relative;
	    float: left;
	    width: 115px;
	    margin-right: 30px;
	}
	.address-edit-wrap form .row .address-select input {
	    width: 95px;
	    height: 30px;
	    margin: 0;
	    padding: 0 10px;
	    text-indent: 0;
	    cursor: pointer;
	}
	.address-edit-wrap form .row .address-select i {
	    display: block;
	    position: absolute;
	    right: 8px;
	    top: 13px;
	    width: 0;
	    height: 0;
	    border-top: 7px solid #a4a9ad;
	    border-left: 5px solid transparent;
	    border-right: 5px solid transparent;
	}
	.address-edit-wrap form .row .select-list {
	    position: absolute;
	    top: 32px;
	    z-index: 100;
	    overflow: auto;
	    width: 118px;
	    height: auto;
	    max-height: 200px;
	    margin: 0 20px 0 0;
	    padding: 0;
	    border: 1px solid #f0efee;
	    background-color: #fff;
	}
	.address-edit-wrap form .row .select-list li:hover {
	    background-color: #eaeaea;
	}
	.address-edit-wrap form .row .province-content {
	    left: 130px;
	}
	.address-edit-wrap form .row .city-content {
	    left: 274px;
	}
	.address-edit-wrap form .row .street-content {
	    left: 420px;
	}
	.address-edit-wrap form .row .select-list li {
	    margin: 0;
	    padding: 5px 0;
	    text-align: center;
	    cursor: pointer;
	}
	.address-edit-wrap form .row .detail-address-inp {
	    width: 405px;
	}
	.address-edit-wrap form .row .address-code {
	    width: 115px;
	}
	.address-edit-wrap form .btn-wrap {
	    clear: both;
	    text-align: center;
	}
	.address-edit-wrap form .btn-wrap .btn-style {
		display: inline-block;
	    width: 135px;
	    height: 30px;
	    margin: 20px;
	    line-height: 30px;
	    color: #fff;
	    transition: background-color .2s ease-out;
	    text-align: center;
	    border-radius: 20px;
	    font-size: 14px;
    	text-align: center;
    	cursor: pointer;
	}
	.address-edit-wrap form .btn-wrap .btn-style.cacel-btn{
		background-color: #5c6670;
	}
	.address-edit-wrap form .btn-wrap .btn-style.save-btn{
		background-color: #df001f;
	}
</style>
