<template>
	<div class="right_bar_border">
		<div>
			<button class="post_btn" id="newspecial" @click="publishtopic">发表新主题</button>
		</div>
		<div class="right-container" v-if="userinfo!=null">
			<div class="show-loginstatus">
				<img src="../assets/community/login-bg.jpg" class="login-bg">
				<div class="login-box">
					<img :src="require('../assets/headport/'+userinfo.headport)">
					<!--未登录状态-->
					<a href="#" class="EnterBtn" v-if="0">立即登录</a>
					<div class="signup-box" v-if="0">新用户 | <a href="#" class="signup-btn">注册</a></div>
					<!--已登录状态-->
					<div class="login-name">{{userinfo.username}}</div>
				</div>
				<div class="login-btn-box">
					<router-link to="/setmyinfo" class="btn-middle btn-active">个人中心</router-link>
					<button href="#" class="btn-middle btn-inactive">签到领积分</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: null
    }
  },
  mounted () {
    this.$http.post('/api/user/selectuser', {
      username: sessionStorage.getItem('username')
    }, {}).then((response) => {
      this.userinfo = response.body
    })
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
  },
  methods: {
    publishtopic: function () {
      console.log(111)
      this.$emit('showbox')
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
.right_bar_border{
  width: 350px;
  float: left;
  .post_btn{
    margin: 0 0 20px 20px;
    color: #fff;
    font-size: 16px;
    background: #df001f url(../assets/community/writePosts.png) 90px 12px no-repeat;
    background-size: 24px 24px;
    width: 330px;
    line-height: 50px;
    display: block;
    text-align: center;
    border-radius: 5px;
  }
  .right-container{
	.show-loginstatus {
	    width: 330px;
	    border-radius: 4px;
	    background-color: #fff;
	    padding-bottom: 20px;
	    margin: 0 20px;
	    height: 320px;
	    .login-bg {
		    width: 330px;
		    height: 140px;
		    border-radius: 4px 4px 0 0;
		}
		.login-box {
		    margin-top: -42px;
		    text-align: center;
		    img {
			    width: 84px;
			    height: 84px;
			    border-radius: 50%;
			}
			.EnterBtn {
			    display: block;
			    width: 128px;
			    height: 36px;
			    line-height: 36px;
			    border-radius: 4px;
			    margin: 30px auto 0;
			    background: #df001f;
			    color: #fff;
			    font-size: 14px;
			}
			.signup-box {
			    font-size: 14px;
			    color: #5c6670;
			    margin-top: 30px;
			    .signup-btn {
				    color: #a4a9ad;
				    margin-left: 5px;
				}
			}
			.login-name {
			    font-size: 18px;
			    color: #5c6670;
			    margin: 10px auto 0;
			    text-align: center;
			}
		}
		.login-btn-box {
		    text-align: center;
		    margin-top: 60px;
		    .btn-middle {
			    width: 128px;
			    height: 36px;
			    line-height: 36px;
			    font-size: 14px;
			    color: #fff;
			    border-radius: 4px;
			    margin-left: 24px;
			    border: none;
			    outline: none;
			    float: left;
			}
			.btn-active {
			    background-color: #df001f;
			}
			.btn-inactive {
			    background-color: #5c6670;
			}
		}
	}
  }
}
</style>
