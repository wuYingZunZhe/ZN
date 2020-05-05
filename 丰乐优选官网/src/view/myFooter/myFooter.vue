<template>
  <div class="myFooter">
     
    <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="foot_div_left">
          <!--<a href="../../../static/imgs/footer/code.png" download="一鹿省">-------->
            <a href="../../../static/imgs/footer/code.png">
              <img src="../../../static/imgs/footer/code.png" alt="">
            </a>
            <p>一鹿省公众号</p>       
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="foot_div_centre">
          <el-row>           
            <el-col :span="12"><a href="https://exbuy.double.com.cn">资讯标题</a></el-col>
            <el-col :span="12"><a href="/join">入驻加盟</a></el-col>
            <el-col :span="12"><a href="#">常见问题</a></el-col>
            <el-col :span="12"><a href="#">反馈帮助</a></el-col>
            <el-col :span="12"><a href="#">诚信举报</a></el-col>
            <el-col :span="12"><a href="/join">加入我们</a></el-col>
          </el-row>           
        </el-col>
        
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="foot_div_right">
          <p class="serve_txt">客服:<a href="tel:1010-9777">1010-9777</a></p>
          <p class="serve_txt">邮箱：<a href="mailto:kehuzhongxin@fanbuy.com.cn?subject='一鹿省'&body='反馈内容..'">kehuzhongxin@fanbuy.com.cn</a></p>
          <p class="serve_txt">周一至周日9：00~23.00</p> 
           
          <p>       
            <a href="weixin://dl/scan" target="_blank">
              <img src="../../../static/imgs/footer/wechat.png" alt="">
            </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="http://wpa.qq.com/msgrd?v=3&uin=408777632&site=qq&menu=yes" target="_blank">
              <img src="../../../static/imgs/footer/qq.png" alt="">
            </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="http://service.weibo.com/share/share.php?count=1&url=https%3A%2F%2Fexbuy.double.com.cn&appkey=&title=%E4%B8%80%E9%B9%BF%E7%9C%81&pic=&ralateUid=&language=zh_cn" target="_blank">
              <img src="../../../static/imgs/footer/xinlang.png" alt="">
            </a> 
          </p>
           
        </el-col>
        
    </el-row>
<!------------备案号------------->
  
    
    <p class="icp">湘ICP备11010502025545号 海ICP证070791号版权所有 © 海南省翻贝花电子商务有限公司 </p>
    
    
  </div>
</template>

<script>

export default {
  name: 'myFooter',
  data () {
    return {
      
    }

  },
  
  methods:{
  }
}
</script>


<style scoped>
.myFooter{
    background: #333;
    color:#BEBEBE;
    /*height: 500px;*/
    text-align: center;
    padding: 20px 0;
}
.foot_div_left{
  padding-top:30px;
}
.foot_div_centre{
  padding-top:50px;
}
.foot_div_centre a{
  color:rgba(190,190,190,1);
  line-height: 30px;
}
/*右侧部分*/
.foot_div_right{
  padding-top:30px;
}
.foot_div_right > .serve_txt{
  width:80%;
  text-align: left;
  margin-left: 20%;
}
.myFooter > * > p{
  
  text-align: center;
}
.icp{
  width:100%;
  text-align: center;
}

</style>
