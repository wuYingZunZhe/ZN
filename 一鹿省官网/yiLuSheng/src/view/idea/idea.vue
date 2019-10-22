<template>
  <div>
    <img class="head_img" src="../../../static/imgs/idea/head_1.png" alt="" >
    <div class="title_2">
      <p>我们的理念</p>
      <p>让天下没有闲置资源</p>
    </div>
    <el-row class="content_2">    
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty1.png" alt="">
        <p>免费为商家 提供线下流量</p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty2.png" alt="">
        <p>免费为商家提供营销管理工具</p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty3.png" alt="">
        <p>为商家创造更多的服务价值</p>
      </el-col>
    </el-row>      

    <div class="content_3">
      <div class="title_2">
        <p>我们的愿景</p>
        <p>让世界爱上一鹿省</p>
      </div>

      <el-row class="content_2">    
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty4.png" alt="">
        <p>为用户推荐最高性价比的服务</p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty5.png" alt="">
        <p>为用户提供最省钱的消费体验</p>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="content_2_div">
        <img src="../../../static/imgs/idea/duty6.png" alt="">
        <p>为用户塑造共同爱好的社交圈</p>
      </el-col>
      </el-row> 

    </div>
      
     
      
  </div>
</template>

<script>
export default {
  name: 'idea',
  
  data () {
    return {
      
    }
  }
}
</script>


<style scoped>
.head_img{
  width:100%;
  height: 500px;
}
.title_2{
  width:100%;
  margin-bottom: 50px;
  text-align: center;
}
.title_2 > p{
  margin:0;
  padding:0;
}
.title_2 >p:nth-child(1){
  font-size:40px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(255,39,79,1);
}
.title_2 >p:nth-child(2){
  font-size:20px;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(51,51,51,1);
}
.content_2{
  text-align: center;
  width:80%;
  margin-left: 10%;
}
.content_2_div{
  text-align: center;
}
.content_2_div > img{
  width:50px;
  height:50px;
}
.content_2_div > p{
  font-size:16px;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(120,120,120,1);
}
.content_3{
  background-image:url('../../../static/imgs/idea/dutybg.png');
  padding:50px 0;
  
}
.content_3 p{
  color:#ddd !important;
}
</style>
