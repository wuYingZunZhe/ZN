<template>
  <div>
    <div class="slideshow wow bounceInLeft">
      <img src="../../../static/pcImgs/shop/banner.png" alt />
    </div>
    <div class="provider wow bounceInRight">
      <img src="../../../static/pcImgs/shop/shopImg.png" alt />
      <div>
        <p>丰乐优选门店入驻</p>
        <p>微信扫描小程序码</p>
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "pcJoin",
  data() {
    return {};
  },
  mounted() {
    new WOW().init();
  }
};
</script>


<style scoped>
.slideshow {
  width: 100%;
  height: 40vh;
}
.slideshow img {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.provider {
  width: 100%;
  height: 300px;
  position: relative;
}
.provider > img:first-child {
  width: 20vw;
  height: 20vw;
  position: absolute;
  border-radius: 50px;
  margin: -60px 0 0 20vw;
}
.provider > div:nth-child(2) {
  width: 60vw;
  height: 20vw;
  position: absolute;
  border-radius: 50px;
  margin: 20px 0 0 46vw;
}
.provider > div:nth-child(2) > p {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 72px;
  margin: 0;
  padding: 0;
}
.provider > div:nth-child(2) > p:first-child {
  font-size: 48px;
}
.provider > div:nth-child(2) > p:nth-child(2) {
  font-size: 30px;
}
</style>
