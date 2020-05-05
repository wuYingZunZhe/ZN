<template>
  <div>
    <img class="head_img" src="../../../static/imgs/home/head_1.png" alt="" >

    <div class="content_1">
      <el-row :gutter="10" >
        <el-col :span="12" class="content_1_div" @click.native="join_1(1)">
            <p class="txt_1">我要入住</p>
            <p class="txt_2">吃喝玩乐商家</p>
        </el-col>
        <el-col :span="12" class="content_1_div"  @click.native="join_1(2)">
            <p class="txt_1">我要加盟</p>
            <p class="txt_2">加盟代理 城市开通</p>
        </el-col>
    </el-row>
    </div>

    <div class="title_2">
      产品介绍
    </div>

    <div class="content_2">
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_div">
            <p class="txt_1">
              <span>一鹿省</span>
              <span>用户端</span>
            </p>
            <p class="txt_2">生活服务特惠平台</p>
            <p class="txt_3">线下到店消费，通通有折扣</p>

            <el-row :gutter="10" class="txt_4">
              <el-col :span="5" :offset="4" class="txt_4_div">
                <div>
                  <img src="../../../static/imgs/home/icon1.png" alt="">
                </div>
                <p>吃</p>
              </el-col>
              <el-col :span="5"  class="txt_4_div active">
                <div>
                  <img src="../../../static/imgs/home/icon2.png" alt="">
                </div>
                <p>喝</p>
              </el-col>
              <el-col :span="5" class="txt_4_div">
                <div>
                  <img src="../../../static/imgs/home/icon3.png" alt="">
                </div>
                <p>玩</p>
              </el-col>
              <el-col :span="5"  class="txt_4_div">
                <div>
                  <img src="../../../static/imgs/home/icon4.png" alt="">
                </div>
                <p>乐</p>
              </el-col>
            </el-row>      
            <p class="txt_5">
              <router-link to="down">
                <span>APP下载</span>
              </router-link>
            </p>       
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_2_div">
          <img src="../../../static/imgs/home/phone_1.png" alt="">
        </el-col>
    </el-row>
    </div>

    <div class="content_3">
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_3_div_left">
          <img src="../../../static/imgs/home/phone_3.png" alt="">
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_3_div_right">
          <p class="txt_1">
            <span>一鹿省</span>
            <span>客户端</span>
          </p>
          <p class="txt_2">让天下没有闲置资源</p>
          <p class="txt_3">提供专业的营销方案：解决线下到店消费获客问题</p>
          <p class="txt_4">解决线下店管理问题：订单分析，客户反馈，在线点评，收银管理，多店管理，大数据分析
          共享实体：各行各业实现数据，收益共享，实现实体产业链大联盟</p>
          <p class="btn_5"> 
            <router-link to="down" class="down">
              <span>APP下载</span>
            </router-link>
          </p>
        </el-col>
    </el-row>
    </div>

    <div class="title_2">
      品牌愿景
    </div>

    <div class="content_4">
      <video src="../../../static/imgs/home/video.mp4" controls="controls" class="video"></video>
    </div>

    <div class="title_2">
      合作案例
    </div>

    <div class="content_5">
      <img  src="../../../static/imgs/home/alliance.png" alt="" >
    </div>

    <div class="title_2">
      最新资讯
    </div>

    <div class="content_6">
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_6_div">
            <img src="../../../static/imgs/home/news.png" alt="">
            <p class="left_txt_1">新闻 | 2019年08月15日</p>
            <p class="left_txt_2">一鹿省新人见面礼换号无限1元充值10元话费 仅限新用户</p>       
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="content_6_div">
            <div  class="right_txt">
              <el-steps direction="vertical" >
                <el-step title="新闻  |  2019-09-10 09:12:20" description="一鹿省新人见面礼换号无限" ></el-step>
                <el-step title="新闻  |  2019-09-10 09:12:20" description="腾讯视频vip买一送一加送一鹿省外卖会员"></el-step>
                <el-step title="新闻  |  2019-09-10 09:12:20" description="1元充值10元话费 一路省新用户专享活动"></el-step>
                <el-step title="新闻  |  2019-09-10 09:12:20" description="一鹿省APP连续签到七天领取现金红包 可无门槛使用"></el-step>
                <el-step title="新闻  |  2019-09-10 09:12:20" description="肥宅快乐APP美团IPO 它的盈利故事怎么讲"></el-step>
                <el-step title="新闻  |  2019-09-10 09:12:20" description="一路省旅游"></el-step>     
              </el-steps>
            </div>
        </el-col>
    </el-row>
    </div>
      
      
  </div>
</template>

<script>
export default {
  name: 'home',
  
  data () {
    return {
      
    }
  },
  methods:{
    join_1:function (id) {
     this.$router.push({ path: '/league', query: { id: id }}); 
    }
  }
}
</script>


<style scoped>
.head_img{
  width:100%;
  height: 100%;
}
/*第一部分*/
.content_1{
  width:50%;
  margin-left:25%;
  text-align: center;
  margin-top:-100px;
}
.content_1_div{
  height:160px;
  background: #fff;
}
.content_1_div > .txt_1{
  font-size:35px;
  font-family:SourceHanSansCN;
  font-weight:400;
}
.content_1_div > .txt_2{
  font-size:20px;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(103,103,103,1);
}
/*第二部分*/
.title_2{
  width:100%;
  margin:20px 0;
  text-align: center;
  font-size:65px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(52,52,52,1);
}
.content_2{
  width:100%;
  background: #FF274F;
}
.content_2_div{
  text-align: center;
  font-family:SourceHanSansCN;
  font-weight:300;
  color:rgba(255,255,255,1);
}
.content_2_div > .txt_1{
  padding-top:20%;
}
.content_2_div > .txt_1 > span{
  font-size:24px;
}
.content_2_div > .txt_1 > span:nth-child(2){
  font-size:14px;
  font-weight:100;
  border:1px solid #fff;
  border-radius: 28px;
  padding:5px 20px;
}
.content_2_div > .txt_2{
  font-size:40px;
}
.content_2_div > .txt_3{
  font-size:16px;
  margin-top:-30px;
}
.content_2_div > .txt_4{
  width:80%;
  margin-left:10%;
  font-size:24px;
}
.content_2_div > .txt_4 >.txt_4_div{
  text-align: center;
}
.content_2_div > .txt_4 >.txt_4_div > div{
  width:100%;
  height: 60%;
  border:1px solid #fff;
  border-radius: 50%;
}
.content_2_div > .txt_4 > .active > div{
  background: #fff;
}
.content_2_div > .txt_4 > .active > p{
  font-weight:900;
}
.content_2_div > .txt_4 >.txt_4_div > div >img{
  margin:25% auto;
  width:50%;
  height: 50%;
}
.content_2_div > .txt_5{
  width:80%;
  margin-left:10%;
  font-size:24px;
}
.content_2_div > .txt_5 > a > span{
  border:1px solid #fff;
  border-radius: 20px;
  padding:5px 20px;
  color:#fff;
}

.content_2_div > img{
  width:80%;
  height: 80%;
  margin:20px 10%;
}
/*第三部分*/

.content_3{
  width:100%;
  background: #fff;
}
.content_3_div_left{
  text-align: center;
}
.content_3_div_left > img{
  width:80%;
  height: 80%;
  margin:20px 10%;
}

.content_3_div_right > .txt_1{
  padding-top:20%;
}
.content_3_div_right > .txt_1 > span{
  font-size:24px;
}
.content_3_div_right > .txt_1 > span:nth-child(2){
  font-size:14px;
  font-weight:100;
  border:1px solid #fff;
  border-radius: 28px;
  padding:5px 20px;
}
.content_3_div_right > .txt_2{
  font-size:40px;
}
.content_3_div_right > .txt_3{
  font-size:16px;
  margin-top:-30px;
}
.content_3_div_right > .btn_5{
  width:100%;
  padding-top:50px;
  text-align: center
}
.content_3_div_right > .btn_5 > .down{
  font-size:24px;
  font-weight:100;
  border:1px solid #fff;
  padding:5px 20px;
  border-radius: 20px;
  background: #FF274F;
  color:#fff;
}
/*第四部分*/

.content_4 {
  width:100%;
  text-align: center;
}
.content_4 .video{
  width:80%;
  margin:20px 10%;
}
/*第五部分*/

.content_5{
  width:100%;
  height: 100%;
  
}
.content_5 > img{
  width:80%;
  height: 80%;
  margin:20px 10%;
}
/*第六部分*/

.content_6_div > img{
  width:80%;
  height: 80%;
  margin:20px 10%;
}
.content_6_div >p{
  margin-left:10%;
  width:80%;
}
.content_6_div > .left_txt_1 {
  font-size:22px;
  /*font-family:SourceHanSansCN;*/
  font-weight:300;
  color:rgba(103,103,103,1);
  
}
.content_6_div > .left_txt_2 {
  font-size:30px;
  /*font-family:SourceHanSansCN;*/
  font-weight:300;
  color:rgba(51,51,51,1);
}
.right_txt{
  padding-top:20px;
  padding-bottom:20px;
  margin-left:10%;
  width:80%;
  position:relative;
 
}
@media screen and (max-device-width:960px){
  .content_1{
    width:80%;
    margin-left:10%;
    text-align: center;
    margin-top:-50px;
  }
  .content_1_div{
    height: 80px;
  }
  .content_1_div > .txt_1{
    font-size: 14px;
  }
  .content_1_div > .txt_2{
    font-size: 6px;
  }
  .title_2{
    font-size: 32px;
  }
  .content_3_div_right > p{
    padding:0 20px;
  }
  .content_3_div_right >.txt_1{
    padding-top:0;
  }
  .content_3_div_right >.txt_2{
    font-size:24px;
    text-align: center;
    padding:10px 0;
    margin-top:-10px;
  }
  .content_3_div_right >.txt_3{
    font-size:24px;
  }
  .content_3_div_right > .btn_5 > .down{
    font-size:16px;
  }
}


</style>
