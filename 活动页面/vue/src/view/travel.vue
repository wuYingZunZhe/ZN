<template>
  <div class="content">
    <div class="bg_img">
        <img src="../../static/imgs/content_1_bg.png" alt="" >
    </div>
    <!----------------->
    <ul>
        <li><img src="../../static/imgs/content_2_img_1.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_2.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_3.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_4.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_5.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_6.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_7.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        <li><img src="../../static/imgs/content_2_img_8.png" alt=""><p><a href="#">查看详情<img src="../../static/imgs/icon.png" alt=""></a></p></li>
        
    </ul>
    <div class="bg_img">
        <img src="../../static/imgs/content_3_bg.png" alt="" >
    </div>

    <div class="my_txt">
        <p>1、本次活动适用于双人使用，年龄3-68周岁（具体收客年龄标准请参照旅游手册上每条旅游线路的活动说明）、身体健康，具有完全刑事责任能力的中国籍公民（注：旅游线路当地居住公民不可参加此活动）。 </p>
        <p>2、此卡只限会员本人使用，可带一人共同出游，全球八大旅游路线可任意选择，在一年有效期内不限出游次数。  </p>
        <p>3、本次活动如遇政治因素、人为不可抗力的因素而造成的行程延误，我公司不承担由此产生的费用、（春节、暑假、国庆等重大节假日出行需补房差），出团以电话咨询为准，如确定参加本次活动需提前七天向我公司报名。</p>
        <p> 4、本次活动之游客必须全程跟团活动，不得中途擅自离团，否则旅行社不承担由此产生的任何法律上的责任。 </p>
        <p>5、本次活动的服务标准：当地四星、五星及特色酒店住宿，特色美食正餐，豪华空调旅游车，优秀专业导游服务(不包含：往返旅游胜地的机票、高铁等大交通费用，以及在景区的自费项目及个人消费项目）。</p>
        <p>6、如对本次活动有任何疑问，欢迎来电咨询，全国服务热线：400-1819-111。</p>
        <p> 7、本次活动旅行社承担所有可能产生的任何法律责任，同时享有本次活动的最终解释权。 </p>
        <p>8、根据路线不同，每人需要200~300元的综合服务费（包含接送机服务、全程的旅游意外险，但不包含境外当地导游及司机小费）。</p>
    </div>
    <div class="bg_img">
        <img src="../../static/imgs/content_5_bg.png" alt="" >
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'travel',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
*{
    padding:0;
    margin:0;
}
.content{
    background: #FEDA1A;
}
.bg_img > img{
    width:100%;
}
ul{
    width:100%; 
}
ul > li{ 
    list-style:none;
    width:40%;
    margin: 5% 5%;
    padding:5% 0;
    padding-bottom:5%;
    
    /*padding-bottom:5%;*/
    float: left;
    text-align: center;
    background: #fff;
}
ul > li >img{
    width:80%;
    /*margin-left: 10%;*/
}
ul > li > p{
    width:100%;
    /*background: red;*/
    

}
ul > li > p >a{
    width:40%;
    height:50px;
    margin:20px 5%;
    padding:5px 20px;
    line-height: 50px;
    background: #FEDA1A;
    border-radius: 10px;
    text-decoration:none;

    font-size:20px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(231,34,43,1);
}
ul > li > p > a >img{
    /*display: inline-block;*/
    width:30px;
    height:30px;
    margin-left:10px;

    vertical-align:middle;
}
.my_txt{
    width:100%;
    padding:20px 0;
}
.my_txt > p{
    width:80%;
    margin: 10px 10%;
    font-size:19px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,1);
}


@media screen and (max-device-width:960px){
    ul > li{
        width:80%;
        margin:10%;
        padding:10% 0;
    }
    
}

</style>
