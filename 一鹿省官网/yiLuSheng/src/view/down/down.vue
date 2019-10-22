<template>
  <div>
    <!---第一部分----->
    <el-row class="content_1">    
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
        <el-row class="content_1_left">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_1_left_left">           
            <img  src="../../../static/imgs/down/logo.png" alt="" >
            <p>到店消费特惠平台</p>            
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_1_left_right">
            <p class="down_btn">
              <a href="https://apps.apple.com/cn/app/id1457955891" target="_blank">
                <img src="../../../static/imgs/down/apple.png" alt="">
                App Store下载
              </a>             
            </p>
            <p class="down_btn">
              <a href="https://exbuy.double.com.cn/android_package/APP.apk" target="_blank">
                <img src="../../../static/imgs/down/andro.png" alt="">
                 Android 下载
              </a>             
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_1_right">
        <img class="right_img" src="../../../static/imgs/down/head_1.png" alt="" >
      </el-col>
      </el-row> 
      <!---第二部分----->
      <div class="content_2">
        <el-row class="content_2_1">    
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_1_left">
            商户端
            <img src="../../../static/imgs/down/get.png" alt="">
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_1_right">
            一款免费的运营管理工具
          </el-col>
        </el-row>    
        <el-row class="content_2_2">    
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn1.png" alt="">
            <p>营销管理</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn2.png" alt="">
            <p>收银管理</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn3.png" alt="">
            <p>分店管理</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn4.png" alt="">
            <p>数据分析</p>
          </el-col>
        </el-row>  
      </div>
      <!---第三部分----->
      <div class="content_2 content_3">
        <el-row class="content_2_1">    
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_1_left">
            用户端
            <img src="../../../static/imgs/down/save.png" alt="">
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_1_right">
            一款到店消费特惠类平台
          </el-col>
        </el-row>    
        <el-row class="content_2_2">    
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn5.png" alt="">
            <p>口碑推荐</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn6.png" alt="">
            <p>一键消费</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn7.png" alt="">
            <p>我要代言</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="content_2_2_1">
            <img src="../../../static/imgs/down/fn8.png" alt="">
            <p>省钱还赚钱</p>
          </el-col>
        </el-row>  
      </div>
     
  </div>
</template>

<script>
export default {
  name: 'down',
  
  data () {
    return {
      
    }
  }
}
</script>


<style scoped>
/*第一部分*/
.content_1{
  background: #FF274F;
}
/*左侧按钮*/
.content_1_left{
  width:70%;
  margin-left: 15%;
  margin-top:12vw;
  margin-bottom: 50px;
  text-align: center;
  font-family:SourceHanSansCN;
  color:rgba(255,255,255,1);
}
.content_1_left_left{
  font-size:20px;
  font-weight:100;
}
.content_1_left_right{ 
  font-size:16px;
  font-weight:300;
}
.content_1_left_left > img{
  width:80%;
}
.content_1_left_right >.down_btn{
  width:80%;
  margin-left: 10%;
  background: #fff;
  border-radius: 10px;
  padding:10px 20px;
}
/*右侧图片*/
.content_1 > .content_1_right > .right_img{
  width:80%;
  height: 80%;
  margin-left: 10%;
}
/*第二部分*/
.content_2{
  background: #ddd;
  padding:50px 0;
}
.content_2 > .content_2_1{
  width:80%;
  margin-left: 10%;
  padding:20px 0;
  font-family:SourceHanSansCN;
  line-height: 50px;
}
.content_2 > .content_2_1 >.content_2_1_left{
  font-size:30px;
  font-weight:400;
  color:rgba(0,0,0,1);
}
.content_2 > .content_2_1 >.content_2_1_left >img{
  width:30px;
  height:30px;
}
.content_2 > .content_2_1 > .content_2_1_right{
  font-size:18px;
  text-align: center;
  font-weight:300;
  color:rgba(85,85,85,1);
}
.content_2_2{
  width:80%;
  margin-left:10%;
}
.content_2_2 > .content_2_2_1{
  text-align: center;
}
.content_2_2 > .content_2_2_1 >img{
  width:200px;
  height:200px;
}
/*第三部分*/
.content_3{
  background: #fff;
}
</style>
