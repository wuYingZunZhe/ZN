<template>
  <div class="mpFooter">
    <div class="wow shake">
      <img src="../../../static/pcImgs/footer/footerLogo.png" alt />
    </div>

    <div>
      <div class="wow shake">
        <p>丰乐优选公众号</p>
        <a href="../../../static/pcImgs/footer/OfficialImg.png">
          <img src="../../../static/pcImgs/footer/OfficialImg.png" alt />
        </a>
        
      </div>
      <div class="wow shake">
        <p>丰乐优选小程序</p>
        <a href="../../../static/pcImgs/footer/applet.png">
          <img src="../../../static/pcImgs/footer/applet.png" alt />
        </a>
        
      </div>
    </div>

    <div>
      <!-- <p class="serve_txt">联系我们</p> -->
      <p class="serve_txt">
        电话：
        <a href="tel:0394-12345678">0394-12345678</a>
      </p>
      <p class="serve_txt">
        邮箱：
        <a
          href="mailto:fengleyouxuanfuwu@163.com?subject='丰乐优选'&body='反馈内容..'"
        >fengleyouxuanfuwu@163.com</a>
      </p>
      <p class="serve_txt">地址：河南省周口市川汇区中州路中段9号新天地步行街4楼</p>
    </div>

    <!------------备案号------------->
  
    <p class="icp"><a href="http://www.beian.miit.gov.cn">豫ICP备20010795号 Copyright©2020 河南丰乐优选网络科技有限公司 版权所有</a></p>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "myFooter",
  data() {
    return {};
  },
  mounted() {
    new WOW({
      mobile: true, 
      live:false,
      scrollContainer: ".mpFooter" 
    }).init();
  }
};
</script>


<style scoped>
.mpFooter {
  background: #EAB737;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  /* color: rgba(255, 255, 255, 1); */
  color:#333;
  line-height: 36px;
}
a {
  /* color: rgba(255, 255, 255, 1); */
  color:#333;
}
.mpFooter > div {
  width: 92%;
  padding: 0 4%;
}
.mpFooter > div:nth-child(1) {
  text-align: center;
  padding: 30px 0;
}
.mpFooter > div:nth-child(2) {
  display: flex;
  /* text-align: center; */
}
.mpFooter > div:nth-child(2) > div{
  width:50%;
  text-align: center;
}
.mpFooter > div:nth-child(2) > div img {
  width: 30vw;
  height: 30vw;
  border-radius: 20px;
  
}
.mpFooter > div:nth-child(2) > div p {
  margin: 0;
}
.mpFooter > div:nth-child(3) {
  font-size: 12px;
}
.mpFooter > div:nth-child(3) p {
  margin: 0;
}
.icp {
  text-align: center;
  font-size: 10px;
  padding:0 10px;
}
</style>
