<template>
<div >

    <span class="txt_2">Monday</span>
    <span class="txt_3">{{date | formatMonth}}</span>
    <span class="txt_4">{{date | formatSec}}</span>
    <!---
    <set-box class='set'></set-box>
    -->

</div>
</template>

<script>
//import setBox from '../compent/setBox.vue';
export default {
  name: 'drugOne',
  components: {
    //setBox,
  },
  data() {
    return {
      date: new Date()
      
    };
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
  

};
</script>
<style scoped>
div{
  width:100%;
  height:100px;
  position: relative;
  /*background: yellow;*/
}
span{
  position: absolute;
  font-family:Arial;
  font-size:15px;
  font-weight:400;
  color:rgba(19,20,76,1);
  /*line-height:125px;*/
}
.txt_2{
  margin-left: 10%;
  margin-top: 45px;
}
.txt_3{
  margin-left: 10%;
  margin-top: 70px;
}
.txt_4{
  margin-left: 40%;
  margin-top: 60px;
}
.set{
  position: absolute;
  margin-left: 80%;
  margin-top: 8px;
}
</style>
