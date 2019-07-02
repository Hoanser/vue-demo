<template>
	<div class="loginrespage">
    <com-header/>
    <div class="login-wrap">
      <div class="loginres-box">
        <h2 class="loginres-title">设置新密码</h2>
        <div class="loginres-body">
          <p class="inputext addpwdicon"><input type="password" name="olduserpwd" v-model="pwddata.olduserpwd" placeholder="请输入旧密码"></p>
          <p class="inputext addpwdicon"><input type="password" name="newuserpwd0" v-model="pwddata.newuserpwd0" placeholder="请输入新密码"></p>
          <p class="inputext addpwdicon"><input type="password" name="newuserpwd1" v-model="pwddata.newuserpwd1" placeholder="请再次输入新密码"></p>
          <p class="warningtips">{{showwarningtips}}</p>
          <div><button class="btnstyle" tag="button" @click="setnewpwd">设置新密码</button></div>
        </div>
      </div>
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
      pwddata: {
        olduserpwd: '',
        newuserpwd0: '',
        newuserpwd1: ''
      },
      showwarningtips: ''
    }
  },
  methods: {
    setnewpwd: function () {
      var pwddata = this.pwddata
      if (this.pwddata.olduserpwd.trim() === '' || this.pwddata.newuserpwd0.trim() === '' || this.pwddata.newuserpwd1.trim() === '') {
        this.showwarningtips = '输入框不能为空'
      } else if (this.pwddata.olduserpwd === this.pwddata.newuserpwd0) {
        this.showwarningtips = '新旧密码不能一样'
      } else if (this.pwddata.newuserpwd0 !== this.pwddata.newuserpwd1) {
        this.showwarningtips = '两次密码不一致'
      } else {
        this.showwarningtips = ''
        this.$http.post('api/user/setnewpwd', {
          username: sessionStorage.getItem('username'),
          olduserpwd: pwddata.olduserpwd,
          newuserpwd: pwddata.newuserpwd0
        }, {}).then((response) => {
          if (response.data.status === 1) {
            alert('密码修改成功')
            this.$router.push('/myorder/myorderall')
          } else if (response.data.status === 0) {
            alert('密码修改失败')
          } else if (response.data.status === -1) {
            alert('原密码错误')
          }
        })
      }
    }
  }
}

</script>

<style scoped src="assets/css/loginres.css"></style>
