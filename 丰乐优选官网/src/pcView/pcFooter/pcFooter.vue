<template>
  <div class="myFooter">
    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="2" :xl="2" class="hidden-md-and-down">&nbsp;</el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="foot_div_right">
        <p class="serve_txt">联系我们</p>
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
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="foot_div_centre">
        <img src="../../../static/pcImgs/footer/footerLogo.png" class="wow flipInX" alt />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="2" :xl="2" class="hidden-md-and-down">&nbsp;</el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="foot_div_left">
        <div class="wow flipInY">
          <a href="../../../static/pcImgs/footer/OfficialImg.png">
            <img src="../../../static/pcImgs/footer/OfficialImg.png" alt />
          </a>
          <p>丰乐优选公众号</p>
        </div>
        <div class="wow flipInY">
          <a href="../../../static/pcImgs/footer/applet.png">
            <img src="../../../static/pcImgs/footer/applet.png" alt />
          </a>
          <p>丰乐优选小程序</p>
        </div>
      </el-col>
    </el-row>
    <!------------备案号------------->
    <p class="icp">
      <a href="http://www.beian.miit.gov.cn">豫ICP备20010795号 Copyright©2020 河南丰乐优选网络科技有限公司 版权所有</a>
    </p>
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
    new WOW().init();
  }
};
</script>


<style scoped>
.myFooter {
  /* background: #333; */
  background: #EAB737;
  /* color: #bebebe; */
  color:#333;
  /*height: 500px;*/
  text-align: center;
  padding: 20px 0;
}
.foot_div_left {
  padding-top: 30px;
  display: flex;
}
.foot_div_left > div {
  margin: 20px;
}
.foot_div_left > div img {
  width: 100px;
  height: 100px;
}
.foot_div_centre {
  padding-top: 100px;
}
.foot_div_centre a {
  color: rgba(190, 190, 190, 1);
  line-height: 30px;
}
/*右侧部分*/
.foot_div_right {
  padding-top: 30px;
}
.foot_div_right > .serve_txt {
  width: 80%;
  text-align: left;
  margin: 10px 0;
  margin-left: 4%;
  /* font-size: 18px; */
  font-family: Microsoft YaHei;
  font-weight: 400;
  /* color: rgba(255, 255, 255, 1); */
  color:#333;
  line-height: 24px;
}
.myFooter > * > p {
  width: 100%;
  text-align: left !important;
}
.icp {
  width: 100%;
  text-align: center;
}
a {
  /* color: #bebebe; */
  color:#333;
}
</style>
