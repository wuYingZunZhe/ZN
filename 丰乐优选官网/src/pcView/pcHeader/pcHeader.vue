<template>
  <div class="pcHeader">
    <img src="../../../static/pcImgs/header/titleLogo.png" alt />
    <div>
      <div v-bind:class="{ active: nowIndex=='0' }" data-index="0" @click="header_click">首页</div>
      <div v-bind:class="{ active: nowIndex=='1' }" data-index="1" @click="header_click">供应商入驻</div>
      <div v-bind:class="{ active: nowIndex=='2' }" data-index="2" @click="header_click">门店入驻</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pcHeader",
  data() {
    return {
      nowIndex:0,   
      isShow:false,   
    };
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
    this.getWidth();
  },
  destroyed() {
    window.removeEventListener("scroll", this.getScroll);
  },
  methods:{
    header_click:function(e){
      console.log(e)
      console.log(e.target.dataset.index);
      let my_nav=e.target.dataset.index
      this.nowIndex=e.target.dataset.index;
      switch (e.target.dataset.index) {
        case '0': my_nav='/pchome';break;
        case '1': my_nav='/pcprovider';break;
        case '2': my_nav='/pcshop';break;
        default:
          break;
      }
      this.$router.push({ path:my_nav});
    },
   
    getWidth() {
      let width = document.body.clientWidth;
      console.log(width);
      if (width > 900) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //监听滚动
    getScroll(e) {
      this.indexNumTop = $(".pcHeader").offset().top;
      console.log(document.documentElement.scrollTop)
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (
        // !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop >= 100
      ) {
        $(".pcHeader").css("color", "#eab737");
        $(".pcHeader").css("background-color", 'rgba(0,0,0,.5)');
      } else {
          $(".pcHeader").css("color", "#fff");
        $(".pcHeader").css("background-color", "transparent");
      
      }
    }
  }
};
</script>


<style scoped>
.pcHeader {
  width: 100%;
  height: 100px;
  background: #333;
  position: relative;
  color: #fff;
  border-bottom: 1rpx solid #fff;
  position:fixed;
  top:0;
  z-index: 999;
}
.pcHeader img {
  width: 170px;
  height: 55px;
  position: absolute;
  margin: 20px 0 0 20%;
}
.pcHeader > div:nth-child(2) {
  position:absolute;
  width: 40%;
  text-align: center;
  margin-left: 60%;
  height: 100px;
  display: flex;
  float: right;
}
.pcHeader > div:nth-child(2) > div {
  margin: 20px 20px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 38px;
  
}
.pcHeader > div:nth-child(2) > .active{
  color: rgba(234, 183, 55, 1);
  border-bottom: 1px solid rgba(234, 183, 55, 1);
}
</style>
