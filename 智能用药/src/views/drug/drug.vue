<template>
  <div>
    <div class="title">Drug Distribution Settings</div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <!---canvas 绘图---->
        <echarts class="canvas" :msg='time'></echarts>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="form">
          <!---第一部分------>
          <div>
            <img class="img_1" src="../../../static/imgs/time.png"  alt="">
            <span class="txt_1">1.Set the current time</span>

            <!------
            <span class="txt_2">Monday</span>
            <span class="txt_3">18/08/2019</span>
            <span class="txt_4">12:05:20</span>
            -->
            <set class='set'></set>
            
            <drug-one></drug-one>
            
          </div>
          <!---第二部分------>
          <div>
            <img class="img_1" src="../../../static/imgs/bell.png"  alt="">
            <span class="txt_1">2.Set up volum</span>
            <progress-bar class="volum" :min=0 :max=100 v-model = "per"></progress-bar>
          </div>
          <!---第三部分-->

          <div>
            <img class="img_1" src="../../../static/imgs/pill.png"  alt="">
            <span class="txt_1">3.Fill in prescription</span>
            <span class="txt_2">
              Prescription is for<input type="text" v-model="day">days
            </span>
            <span class="txt_3">
              Please fill in the medication information
              <img class="btn_1" src="../../../static/imgs/add.png"  alt="">
            </span>
            <div class="txt_4">
              <p v-for="(drug, i) in list"  :class="{ 'active': active==drug.id}" @click="drug_msg(drug.id)">
                 药名：{{ drug.name }} 剂量：{{drug.dose}} 间隔：{{ drug.time }} 
              </p>
            </div>
          </div>
          <!---第四部分-->
          <div>
            <img class="img_1" src="../../../static/imgs/bell.png"  alt="">
            <span class="txt_1">4.Set up alarm time (up to six)  Add sounds</span>
            <uploading class="img_2"></uploading>
            <sounds class="sounds"></sounds>
          </div>
          <!---第五部分-->
          <div>
            <img class="img_1" src="../../../static/imgs/diet.png"  alt="">
            <span class="txt_1">5.Set up non-alarm time(the tray won't turn)</span>
            <uploading class="img_2"></uploading>
            <sounds class="sounds"></sounds>
          </div>
          <!----提交保存------>
          <button class="save">SAVE</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from './echarts.vue';
import progressBar from '../compent/progressBar.vue';
import sounds from './addSounds.vue';
import uploading from '../compent/uploading.vue';
import set from '../compent/setBox.vue';
import drugOne from './drugOne.vue';

export default {
  name: 'drug',
  components: {
    echarts ,
    progressBar,
    sounds,
    uploading,
    set,
    drugOne,
},
  data () {
    return {
      per:50,
      day:12,
			list: [
        { id: 0, name: '白加黑' ,dose:'2片/次',time:'1天'},
        { id: 1, name: '板蓝根' ,dose:'2片/次',time:'3天'},
        { id: 2, name: '感冒灵' ,dose:'2片/次',time:'4天'},
        { id: 3, name: '四环素' ,dose:'2片/次',time:'5天' },
        { id: 4, name: '地西平' ,dose:'2片/次',time:'6天' },
        { id: 5, name: '心痛定' ,dose:'2片/次',time:'7天'},
        { id: 6, name: '心得安' ,dose:'2片/次',time:'8天'},
        { id: 7, name: '药品7' ,dose:'2片/次',time:'9天' },
        { id: 8, name: '药品8' ,dose:'2片/次',time:'3天' },
        { id: 9, name: '药品9' ,dose:'2片/次',time:'2天'},
        { id: 10, name: '药品10' ,dose:'2片/次',time:'3天'},
        { id: 11, name: '药品11' ,dose:'2片/次',time:'5天' },
        { id: 12, name: '药品12' ,dose:'2片/次',time:'2天' },
        { id: 13, name: '药品13' ,dose:'2片/次',time:'1天'},
        { id: 14, name: '药品14' ,dose:'2片/次',time:'6天'},
        { id: 15, name: '药品15' ,dose:'2片/次',time:'3天' },
        { id: 16, name: '药品16' ,dose:'2片/次',time:'2天' }
      ],
      active:2,
      time:2,  
    }
  },
  mounted(){
   
  },
  methods:{
    drug_msg:function(id){
      //console.log(id)
      this.active=id;
      this.time=parseInt(this.list[id].time);
      //parseInt("1234blue")
      
    },
    
  }
  
}
</script>
<style scoped>
*{margin:0;padding:0}
/*标题*/
.title{
  width:100%;
  height:48px;
  margin-bottom:20px;
  position: relative;
  font-size:50px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  text-align: center;
}
/*canvas药格*/
.canvas{
  text-align:center;
  margin-top: 150px;
}
/*form表单*/
.form{
  /*padding-top:50px;*/
}
/*通用部分*/
.form > div{  
  width:100%;
  height:350px;
  position: relative;
  /*background: yellowgreen;*/
}
.form > div > .img_1{
  width:5%;
  position: absolute;
  margin-left: 2%;
  margin-top: 10px;
}
.form > div > .txt_1{
  width:60%;
  position: absolute;
  margin-left: 10%;
  margin-top: 10px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  /*line-height:50px;*/
  border-bottom:4px solid rgba(95,135,249,1);
  overflow:hidden;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
/*第一部分*/
.form > div:nth-child(1){
  width:100%;
  height:100px;
  position: relative;
  /*background: yellow;*/
}
.form > div:nth-child(1) > span{
  position: absolute;
  font-family:Arial;
  font-size:15px;
  font-weight:400;
  color:rgba(19,20,76,1);
  /*line-height:125px;*/
}
.form div:nth-child(1) > .txt_1{
  width:60%;
  margin-left: 10%;
  margin-top: 10px;
  font-size:24px;
  font-weight:bold;
  color:rgba(95,135,249,1);
  border-bottom:4px solid rgba(95,135,249,1);
}

.form div:nth-child(1) > .txt_2{
  margin-left: 10%;
  margin-top: 45px;
}
.form div:nth-child(1) > .txt_3{
  margin-left: 10%;
  margin-top: 70px;
}
.form div:nth-child(1) > .txt_4{
  margin-left: 10%;
  margin-top: 60px;
}
.form div:nth-child(1) > .set{
  position: absolute;
  margin-left: 80%;
  margin-top: 8px;
  z-index:3;
}
/*第二部分*/
.form > div:nth-child(2){
  width:100%;
  height:120px;
  position: relative;
  /*background: #666;*/
}
.form > div:nth-child(2) > .volum{
  position: absolute;
  margin-left: 10%;
  margin-top: 80px;
}
/*第三部分*/
.form div:nth-child(3) > .txt_2{
  position: absolute;
  margin-left: 10%;
  margin-top: 60px;
  font-size:15px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(19,20,76,1);
}
.form div:nth-child(3) > .txt_2 >input{
  width:50px;
  margin:0 10px;
  text-align: center;
}
.form div:nth-child(3) > .txt_3{
  height:10px;
  position: absolute;
  margin-left: 10%;
  margin-top: 85px;
  font-size:15px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(19,20,76,1);
}
.form div:nth-child(3) > .txt_3 >.btn_1{
  width:15px;
  margin-left:5px;
}
.form div:nth-child(3) > .txt_4{
  width:80%;
  height:200px;
  position: absolute;
  margin-left: 10%;
  margin-top: 120px;
  padding-top:20px;
  background:#eee;
  overflow-y:auto;
}
.form div:nth-child(3) > .txt_4 > p{
  margin-left:2px;
}
.form div:nth-child(3) > .txt_4 > .active{
  color:#5F87F9;
}
/*第四部分*/
.form > div:nth-child(4){
  height:300px;
}
.form > div:nth-child(4) > .img_2{
  width:38px;
  position: absolute;
  margin-left: 80%;
  margin-top: 20px;
}
.form > div:nth-child(4) > .sounds{
  position: absolute;
  width:80%;
  margin-left: 10%;
  margin-top: 80px;

}
/*第五部分*/
.form > div:nth-child(5){
  height:300px;
}
.form > div:nth-child(5) > .img_2{
  width:38px;
  position: absolute;
  margin-left: 80%;
  margin-top: 20px;
}
.form > div:nth-child(5) > .sounds{
  position: absolute;
  width:80%;
  margin-left: 10%;
  margin-top: 80px;
}
.form > .save{
  width:20%;
  height:66px;
  background:rgba(95,135,249,1);
  border-radius:5px;
  margin-left:40%;
  margin-top:20px;
}

/*手机端样式调整*/
@media screen and (max-width: 900px) {
  .title{
    font-size:25px;
  }
  .canvas{
    margin-top: 0;
  }
  .form{
    margin-top:0;
  }
  .form > div > .txt_1{
    font-size:24px;
  }
}






</style>
