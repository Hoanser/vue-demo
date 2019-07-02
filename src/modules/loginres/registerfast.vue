<template>
	<div class="loginrespage">
    <com-header/>
    <div class="login-wrap">
      <div class="loginres-box">
        <h2 class="loginres-title">快速注册</h2>
        <div class="loginres-body">
          <p class="inputext addphoneicon"><input type="text" name="username" placeholder="请输入用户名" v-model="username"></p>
          <!--<div>
                      <p class="inputext getphonecode"><input type="password" name="userpwd" placeholder="短信验证码"></p>
                      <a href="#" class="sendcode">发送验证码</a>
                  </div>-->
          <p class="inputext addpwdicon"><input type="password" name="userpwd" placeholder="请输入密码" v-model="userpwd"></p>
          <p class="inputext addpwdicon"><input type="password" name="userpwd" placeholder="请再次输入密码" v-model="userpwdagain"></p>
          <!--<p class="inputext emailicon"><input type="password" name="userpwd" placeholder="请输入电子邮箱（选填）"></p>-->
          <div class="rememberline fs12">
            <label class="rememberlogin"><input type="checkbox" name="savelogin" checked="true">已阅读并同意注册&nbsp;&nbsp;<a href="#">用户协议</a></label>
            <span class="movetoright">
						<router-link to="/login">账号登录&gt;&gt;</router-link>
					</span>
          </div>
          <div><button class="btnstyle" @click="regUser">完成注册</button></div>
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
        username: '',
        userpwd: '',
        userpwdagain: ''
      }
    },
    methods: {
      regUser () {
        if (this.username.trim() === '') {
          alert('用户名不能为空')
        } else if (this.userpwd.trim() === '' || this.userpwdagain.trim() === '') {
          alert('密码不能为空')
        } else if (this.userpwd.trim() !== this.userpwdagain.trim()) {
          alert('两次密码不一样')
        } else {
          let username = this.username
          let userpwd = this.userpwd
          this.$http.post('/api/user/reg', {
            username: username,
            userpwd: userpwd
          }, {}).then((response) => {
            if (JSON.parse(response.bodyText).status === 0) {
              alert('该用户名已存在')
            } else if (JSON.parse(response.bodyText).status === 1) {
              alert('注册成功')
              this.$router.push('/login')
            }
          })
        }
      }
    }
  }

</script>

<style scoped src="assets/css/loginres.css"></style>
