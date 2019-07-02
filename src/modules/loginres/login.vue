<template>
	<div class="loginrespage">
    <com-header/>
		<div class="login-wrap">
      <div class="loginres-box">
        <h2 class="loginres-title">用户登录</h2>
        <div class="loginres-body">
          <p class="inputext addphoneicon" :class="{warningicon:is_showarningicon[0]}"><input type="text" name="username" placeholder="请输入手机号码/邮箱/用户名" v-model="useraccout" @focus="is_showarningicon = [false,false]"></p>
          <p class="inputext addpwdicon" :class="{warningicon:is_showarningicon[1]}"><input type="password" name="userpwd" placeholder="请输入密码" v-model="userpwd" @focus="is_showarningicon = [false,false]"></p>
          <div class="rememberline fs12">
            <label class="rememberlogin"><input type="checkbox" name="savelogin">记住登录状态</label>
            <span class="movetoright">
						<!--<router-link to="/forgetpwd">忘记密码</router-link>-->
						<router-link to="/registerfast">快速注册</router-link>
					</span>
          </div>
          <div><button class="btnstyle" @click="loginbtn">立即登录</button></div>
          <div class="loginother">
            <span>其他方式登录</span>
            <span class="loginotherbox"><i class="loginothericon wechat"></i><i class="loginothericon weibo"></i><i class="loginothericon qq"></i></span>
            <span class="movetoright"><router-link to="/loginfast">快速登录&gt;&gt;</router-link></span>
          </div>
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
        useraccout: '',
        userpwd: '',
        is_showarningicon: [false, false]
      }
    },
    methods: {
      loginbtn (e) {
        if (this.useraccout.trim() === '') {
          this.is_showarningicon = [true, false]
        } else if (this.userpwd.trim() === '') {
          this.is_showarningicon = [false, true]
        } else {
          let username = this.useraccout
          let userpwd = this.userpwd
          this.$http.post('/api/user/login', {
            username: username,
            userpwd: userpwd
          }, {}).then((response) => {
            if (JSON.parse(response.bodyText).status === 0) {
              alert('用户名或密码错误')
            } else if (JSON.parse(response.bodyText).status === 1) {
              sessionStorage.setItem('username', username)
              alert('登录成功')
              this.$router.push('/')
            }
          })
        }
      }
    }
  }

</script>

<style scoped src="assets/css/loginres.css"></style>
