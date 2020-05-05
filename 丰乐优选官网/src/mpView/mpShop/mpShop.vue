<template>
  <div class="bg">
    <div class="provider wow wobble">
      <a href="../../../static/pcImgs/shop/shopImg.png">
        <img src="../../../static/pcImgs/shop/shopImg.png" alt />
      </a>
      <p>丰乐优选供应商入驻</p>
      <p>微信扫描小程序码</p>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "mpprovider",
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
.bg {
  background: cornflowerblue;
  padding: 20px 0;
}
.provider {
  width: 92%;
  margin: 20px 4%;
  padding: 60px 0;
  text-align: center;
  background: #fff;
  border-radius: 50px;
}
.provider > img {
  width: 40%;
}
.provider > p {
  font-family: Microsoft YaHei;

  color: rgba(51, 51, 51, 1);
}
.provider > p:nth-child(2) {
  font-size: 24px;
  line-height: 20px;
  font-weight: 400;
}
.provider > p:nth-child(3) {
  font-size: 16px;
}
</style>
