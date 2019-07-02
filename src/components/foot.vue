
<template>
  <div id="footerbox">
    <div class="bn-content">
      <ul class="bottom-nav">
        <li>
          <h4>了解产品</h4>
          <p>
            <a href="#">小牛电动 N1S</a>
          </p>
          <p>
            <a href="#">小牛电动 M1</a>
          </p>
          <p>
            <a href="#">配件</a>
          </p>
        </li>
        <li>
          <h4>服务与支持</h4>
          <p>
            <a href="#">查找网点</a>
          </p>
          <p>
            <a href="#">小牛驾到</a>
          </p>
          <p>
            <a href="#">牛油保</a>
          </p>
          <p>
            <a href="#">NIU CARE</a>
          </p>
          <p>
            <a href="#">售后政策</a>
          </p>
          <p>
            <a href="#">NIU APP</a>
          </p>
        </li>
        <li>
          <h4>帮助中心</h4>
          <p>
            <a href="#">购买指南</a>
          </p>
          <p>
            <a href="#">支付方式</a>
          </p>
          <p>
            <a href="#">配送政策</a>
          </p>
        </li>
        <li>
          <h4>关于我们</h4>
          <p>
            <a href="#">公司简介</a>
          </p>
          <p>
            <a href="#">联系我们</a>
          </p>
          <p>
            <a href="#">加入我们</a>
          </p>
        </li>
        <li>
          <h4>关注我们</h4>
          <p>
            <a href="#">微信公众号</a>
          </p>
          <p>
            <a href="#">新浪微博</a>
          </p>
        </li>
        <li>
          <h4>客服</h4>
          <p>
            <a href="#">400-6388-666</a>
          </p>
          <p>
            <a href="#">周一至周日 7:00-21:00</a>
          </p>
          <p>
            <a href="#">仅收市话费</a>
          </p>
        </li>
      </ul>
      <div class="cpr-content">
        <p>© 2017 niu.com All rights reserved. 北京牛电科技有限责任公司 京ICP备15010724号-1</p>
        <p><a href="#">International</a><span>中国</span></p>
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
      font: 14px/1.5 'PingFang SC','Helvetica Neue',Helvetica,'Hiragino Sans GB',STHeitiSC-Light,'Microsoft YaHei',Arial,sans-serif;
}
a{
  text-decoration: none;
}
ul,li,p{
  list-style: none;
  padding: 0;
  margin: 0;
}
#footerbox{
  background-image: linear-gradient(to bottom,#f5f5f5,#fff);
    width: 100%;
    min-width: 1200px;
    clear: both;
    padding: 30px 0 0 0;
  }
  .bn-content a{
    color: #a4a9ad;
    font-size: 12px;
  }
  .bn-content a:hover{
    color: #5c6670;
  }
  .bottom-nav,.cpr-content{
    display: flex;
    width: 1140px;
    margin: 0 auto;
  }
  .bottom-nav li{
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 16.666%;
    padding-left: 30px;
  }
  .bottom-nav li h4{
    font-size: 14px;
    color: #5c6670;
  }
  .bottom-nav li a{
    color: #a4a9ad;
    font-size: 12px;
    line-height: 24px;
  }
  .cpr-content{
    font-size: 12px;
    color: #a4a9ad;
    margin-top: 30px;
    justify-content:space-between;
  }
  .cpr-content p{
    margin: 0 60px 0 30px;
    line-height: 24px;
  }
  .hasb{
    display: inline-block;
  }
</style>
