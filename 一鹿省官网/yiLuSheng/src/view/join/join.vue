<template>
  <div>
    <!---第一部分----->
    <el-row class="content_1">    
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_1_left">
        <div>
          <p>加入一鹿省</p>
          <p>收益有保证</p>
          <p><a href="#">申请加盟</a></p>
        </div>
      </el-col>
    </el-row> 
    <!---第二部分------>  
    <div class="part_2">
      <div class="title_2">
        市场空间巨大
      </div>
      <el-row class="content_2">    
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_left">
            <img src="../../../static/imgs/join/join1.png" alt="">
            
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_right">
            <img src="../../../static/imgs/join/join2.png" alt="">
          </el-col>
          <p class="content_2_3_title">城市合伙人有话说</p>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_txt_left">
            <el-row class="content_2_txt_left_row">
              <el-col :span="8" class="content_2_txt_left_col">
                <p>&nbsp;</p>
                <p>成都市</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col active">
                <p>+300%</p>
                <p>订单量</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col">
                <p>3400单</p>
                <p>单品月销量</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" id="content_2_txt_right" class="content_2_txt_right">
            <img src="../../../static/imgs/join/userlogo1.png" alt="">
            <div>
              “我们成都市 ，服务行业商数超过200万家，目前跟我们合作的商家5万家，商家对 于平台的运营理念高度认可，现在基本上所有的合作商家，都是通过一鹿省来进行服务客户的。”
            </div>
            
          </el-col>
      </el-row>      
    </div>
    <!---第三部分------>  
    <div class="part_2 part_3">
      <div class="title_2">
        投资回报率高
      </div>
      <el-row class="content_2">    
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_left">
            <img src="../../../static/imgs/join/join3.png" alt="">
            
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_right">
            <img src="../../../static/imgs/join/join4.png" alt="">
          </el-col>
          <p class="content_2_3_title">城市合伙人有话说</p>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_txt_left">
            <el-row class="content_2_txt_left_row">
              <el-col :span="8" class="content_2_txt_left_col">
                <p>&nbsp;</p>
                <p>郑州市</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col active">
                <p>+300%</p>
                <p>订单量</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col">
                <p>3400单</p>
                <p>单品月销量</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" id="content_2_txt_right" class="content_2_txt_right">
            <img src="../../../static/imgs/join/userlogo1.png" alt="">
            <div>
              “放郑州城市合伙人，关于投资回报的评述。”
            </div>
            
          </el-col>
      </el-row>      
    </div>
    <!---第四部分------>  
    <div class="part_2">
      <div class="title_2">
        成熟的模式和体系
      </div>
      <el-row class="content_2">    
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_left">
            <img src="../../../static/imgs/join/join1.png" alt="">
            
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_img_right">
            <img src="../../../static/imgs/join/join2.png" alt="">
          </el-col>
          <p class="content_2_3_title">城市合伙人有话说</p>
          
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_txt_left">
            <el-row class="content_2_txt_left_row">
              <el-col :span="8" class="content_2_txt_left_col">
                <p>&nbsp;</p>
                <p>西安市</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col active">
                <p>+300%</p>
                <p>订单量</p>
              </el-col>
              <el-col :span="8" class="content_2_txt_left_col">
                <p>3400单</p>
                <p>单品月销量</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" id="content_2_txt_right" class="content_2_txt_right">
            <img src="../../../static/imgs/join/userlogo1.png" alt="">
            <div>
              “放西安城市合伙人，关于服务和商 业模式的评述。”
            </div>
            
          </el-col>
      </el-row>      
    </div>
      
      
  </div>
</template>

<script>
export default {
  name: 'join',
  
  data () {
    return {
      
    }
  }
}
</script>


<style scoped>
/*第一部分*/
.content_1{
  height: 500px;
  background-image:url('../../../static/imgs/join/joinbg.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;

}
.content_1_left > div{
  width:200px;
  height: 200px;
  margin-top:150px;
  margin-left: 25%;
  text-align: center;
  
}
.content_1_left > div > p{
  font-size:30px;
  font-family:SourceHanSansCN;
  font-weight:900;
  color:#333;
}
.content_1_left > div > p:nth-child(3) >a{
  padding:5px 10px;
  border:1px solid transparent;
  background: #FF274F;
  border-radius: 10px;
  font-size:15px;
  font-weight:300;
  color:rgba(255,255,255,1);
}
/*第二部分*/
.part_2{
  padding:80px 0 50px 0;
}
.title_2{
  width:100%;
  margin-bottom:20px;
  text-align: center;
  font-size:32px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:#FF274F;
}
.content_2{
  width:80%;
  margin-left:10%;
}
.content_2_img_left > img {
  width:80%;
  height: 200px;
  margin-left: 10%;
  margin-bottom: 10px;
}
.content_2_img_right > img{
  width:80%;
  height: 200px;
  margin-left: 10%;
  margin-bottom: 50px;
}
.content_2_3_title{
  width:100%;
  margin:20px 0;
  text-align: center;
  font-size:18px;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(51,51,51,1);
}
.content_2_txt_left_row{
  width:80%;
  margin-left: 10%;
}
.content_2_txt_left_col{
  text-align: center;
}
.content_2_txt_left{
  background: #fff;
  padding:20px;
}
.content_2_txt_left_row >.active >p:nth-child(1){
  color:#FF274F;
}
.content_2_txt_left_col > p:nth-child(1){
  font-size:18px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.content_2_txt_left_col > p:nth-child(2){
  font-size:13px;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(52,52,52,1);
}
.content_2_txt_right{
  /*height: 135px;*/
  padding:37px 0;
  display:flex;
  background: #fff;
}
.content_2_txt_right > img{
  width:60px;
  height:60px;
  border-radius: 50%;
  display: block;
  margin:0 20px ;
}
/*第三部分*/
.part_3{
  background: #ddd;
}


</style>
