<template>
  <div class="header">
    <a href="#" class="logo"></a>
    <nav class="header-nav">
      <ul>
        <li>
          <router-link to="/" class="nav-title">首页</router-link>
        </li>
        <li>
          <router-link to="/shop" class="nav-title">商城</router-link>
        </li>
        <li>
          <router-link to="/info" class="nav-title">宝贝信息</router-link>
        </li>
        <li>
          <router-link to="/excenter" class="nav-title">授权体验店</router-link>
        </li>
        <li class="nav-comcollapse">
          <router-link to="/community" class="nav-title">社区</router-link>
          <div class="header-collapse community">
            <router-link to="/community">主页</router-link>
            <router-link to="/community/product">产品讨论区</router-link>
            <router-link to="/community/parent">宝妈讨论区</router-link>
          </div>
        </li>
      </ul>
    </nav>
    <ul class="header-right">
      <li class="right-usercollapse">
        <router-link to="/myorder/myorderall" class="user"><i></i></router-link>
        <div class="header-collapse nouser-collapse" :style="{ display: userShow }">
          <div class="user-btns">
            <router-link to="/login" class="login_btn">登录</router-link>
            <router-link to="/registerfast" class="reg_btn">注册</router-link>
          </div>
        </div>
      </li>
      <li class="right-cartcollapse">
        <router-link to="/shop/cart" class="cart"><i></i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      userShow: 'block'
    }
  },
  created () {
    if (sessionStorage.getItem('username')) {
      this.userShow = 'none'
    } else {
      this.userShow = 'block'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
  .header{
    width: 1170px;
    height: 50px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, .2);
    transform: translateX(-50%);
    position: absolute;
    top: 15px;
    left: 50%;
    z-index: 100;
    .logo{
      width: 60px;
      height: 100%;
      padding: 0 30px;
      margin: 0 15px;
      background: url("../assets/header/logo.svg") no-repeat 50% 50%;
      float: left;
    }
    .header-collapse{
      width: 100%;
      height: 0;
      background: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: hidden;
      position: absolute;
      top: 46px;
      left: 0;
      transition: all .2s ease-out;
    }
    .community a{
      color: #5c6670;
      height: 20px;
      padding: 5px 20px;
      line-height: 20px;
      transition: all 200ms ease-out;
      margin-top: 40px;
      display: inline-block;
      &:hover{color: #a4a9ad;}
      &:last-child{margin-right: 40px;}
    }
    .nav-comcollapse:hover .community{height: 90px;text-align: right}
    .right-usercollapse:hover .nouser-collapse{height: 90px}
    .header-nav{
      float: left;
      ul{overflow: hidden}
      li{
        line-height: 50px;
        margin-right: 15px;
        padding: 0 20px;
        float: left;
        .nav-title{
          color: #212121;
          padding: 0 5px;
        }
        .header-nav{
          width: 30px;
          height: 30px;
          margin-top: 10px;
        }
        a:hover{
          color: #A9AEB2;
        }
      }
    }
    .header-right{
      margin-right: 30px;
      float: right;
      overflow: hidden;
      li{
        height: 50px;
        margin: 0 19px;
        float: left;
      }
      .user, .cart{
        width: 17px;
        height: 17px;
        padding: 17px 14px;
        display: inline-block;
        position: relative;
      }
      .user i{
        width: 17px;
        height: 17px;
        background: url("../assets/header-ico.png") no-repeat 0 0;
        position: absolute;
      }
      .cart i{
        width: 17px;
        height: 17px;
        background: url("../assets/header-ico.png") no-repeat -24px -1px;
        position: absolute;
      }
      .user-btns{
        margin: 12px 50px;
        float: right;
      }
      .login_btn, .reg_btn{
        font-size: 14px;
        padding: 5px 20px;
        margin: 15px;
        border-radius: 4px;
        display: inline-block;
        transition: all .2s ease-out;
      }
      .login_btn{
        color: #5c6670;
        border: 1px solid #d1d3d3;
      }
      .reg_btn{
        color: #df001f;
        border: 1px solid rgba(223,0,31,.2);
      }
      .login_btn:hover{border-color: #5c6670}
      .reg_btn:hover{border-color: #df001f}
      .nogoods{
        color: #5c6670;
        text-align: center;
        margin-top: 60px;
      }
    }
  }
</style>
