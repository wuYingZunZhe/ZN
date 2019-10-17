<template>
  <div class='content'>
    <div class="title">Drug Distribution Settings</div>
   <!---canvas 绘图---->
    <echarts class="canvas"></echarts>
    <table></table>
    <div class="form">
      <!---第一部分------>
      <div>
        <img class="img_1" src="../../../static/imgs/time.png"  alt="">
        <span class="txt_1">1.Set the current time</span>
        <span class="txt_2">Monday</span>
        <span class="txt_3">18/08/2019</span>
        <span class="txt_4">12:05:20</span>
        
        <el-button type="text set" @click="dialogVisible = true">
          <img class="img_2" src="../../../static/imgs/set.png"  alt="">
          <span> set</span>
        </el-button>
        
      </div>
      <!---第二部分------>
      <div>
        <img class="img_1" src="../../../static/imgs/bell.png"  alt="">
        <span class="txt_1">2.Set up volum</span>
        <volum class="volum" :min=0 :max=100 v-model = "per"></volum>
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
        <table></table>
        <div class="txt_4">
					<p v-for="(drug, i) in list" :class="{ 'active': active==drug.id}">
            编号：{{ drug.id }} --- 药名：{{ drug.name }} -- 剂量：{{drug.doce}} --- 次数：{{ drug.name }} -- 索引：{{i}}
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



    <!----弹出框---->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>设置时间</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    

    
    
    

  </div>
</template>

<script>
import echarts from './echarts.vue';
import volum from './volum.vue';
import sounds from './addSounds.vue';
import uploading from '../compent/uploading.vue';
export default {
  name: 'drug',
  components: {
    echarts ,
    volum,
    sounds,
    uploading
},
  data () {
    return {
      dialogVisible: false,
      per:50,
      day:12,
			list: [
        { id: 1, name: '药品1' ,dose:'一次一片',time:'一天一次'},
        { id: 2, name: '药品2' ,dose:'一次一片',time:'一天一次'},
        { id: 3, name: '药品3' ,dose:'一次一片',time:'一天一次' },
        { id: 4, name: '药品4' ,dose:'一次一片',time:'一天一次' },
        { id: 5, name: '药品5' ,dose:'一次一片',time:'一天一次'},
        { id: 6, name: '药品6' ,dose:'一次一片',time:'一天一次'},
        { id: 7, name: '药品7' ,dose:'一次一片',time:'一天一次' },
        { id: 8, name: '药品8' ,dose:'一次一片',time:'一天一次' },
        { id: 9, name: '药品9' ,dose:'一次一片',time:'一天一次'},
        { id: 10, name: '药品10' ,dose:'一次一片',time:'一天一次'},
        { id: 11, name: '药品11' ,dose:'一次一片',time:'一天一次' },
        { id: 12, name: '药品12' ,dose:'一次一片',time:'一天一次' },
        { id: 13, name: '药品13' ,dose:'一次一片',time:'一天一次'},
        { id: 14, name: '药品14' ,dose:'一次一片',time:'一天一次'},
        { id: 15, name: '药品15' ,dose:'一次一片',time:'一天一次' },
        { id: 16, name: '药品16' ,dose:'一次一片',time:'一天一次' }
      ],
      active:2,  
    }
  },
  watch:{
    
  },
  methods:{
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }
  
}
</script>
<style scoped>
*{margin:0;padding:0}
.content{
  width:100%;
  height: 1800px;
  background: #ddd;
  position: relative;
}
/*标题*/
.content .title{
  width:100%;
  position: absolute;
  margin-top: 100px;
  height:48px;
  font-size:50px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:54px;
  text-align: center;
}
/*canvas药格*/
.content .canvas{
  width:500px;
  height:500px;
  position: absolute;
  margin-left: 100px;
  margin-top: 150px;
}
/*form表单*/
.content .form{
  width:50%;
  height: 80%;
  position: relative;
  /*background: red;*/
  margin-left:40%;
  margin-top:200px;
}
/*第一部分*/
.content > .form > div:nth-child(1){
  width:100%;
  height:150px;
  position: relative;
  /*background: yellow;*/
}
.content > .form div:nth-child(1) > .img_1{
  width:38px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
}
.content > .form > div:nth-child(1) > .txt_1{
  position: absolute;
  margin-left: 80px;
  margin-top: 20px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:50px;
  width:80%;
  border-bottom:4px solid rgba(95,135,249,1);
}
.content > .form div:nth-child(1) > .txt_2{
  position: absolute;
  margin-left: 80px;
  margin-top: 35px;
  font-size:15px;
  font-family:Arial;
  font-weight:400;
  color:rgba(19,20,76,1);
  line-height:125px;
}
.content > .form div:nth-child(1) > .txt_3{
  position: absolute;
  margin-left: 80px;
  margin-top: 60px;
  font-size:15px;
  font-family:Arial;
  font-weight:400;
  color:rgba(19,20,76,1);
  line-height:125px;
}
.content > .form div:nth-child(1) > .txt_4{
  position: absolute;
  margin-left: 40%;
  margin-top: 40px;
  font-size:15px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(19,20,76,1);
  line-height:125px;
}
.content > .form div:nth-child(1) > .set{
  position: absolute;
  margin-left: 70%;
  margin-top: 85px;
}

.content > .form div:nth-child(1) > .set > .img_2{
  width:20px;
}
.content > .form div:nth-child(1)  > .set span{
  font-size:28px;
  font-family:Arial;
  font-weight:400;
  color:rgba(95,135,249,1);
  line-height:100%;
}
/*第二部分*/
.content > .form > div:nth-child(2){
  width:100%;
  height:150px;
  position: relative;
  /*background: #666;*/
}

.content > .form div:nth-child(2) > .img_1{
  width:38px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
}
.content > .form > div:nth-child(2) > .txt_1{
  position: absolute;
  margin-left: 80px;
  margin-top: 20px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:50px;
  width:80%;
  border-bottom:4px solid rgba(95,135,249,1);
}
.content > .form > div:nth-child(2) > .volum{
  position: absolute;
  margin-left: 80px;
  margin-top: 100px;
}
/*第三部分*/
.content > .form > div:nth-child(3){  
  width:100%;
  height:350px;
  position: relative;
  /*background: yellowgreen;*/
}

.content > .form > div:nth-child(3) > .img_1{
  width:38px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
}
.content > .form > div:nth-child(3) > .txt_1{
  position: absolute;
  margin-left: 80px;
  margin-top: 20px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:50px;
  width:80%;
  border-bottom:4px solid rgba(95,135,249,1);
}
.content > .form div:nth-child(3) > .txt_2{
  position: absolute;
  margin-left: 80px;
  margin-top: 35px;
  font-size:15px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(19,20,76,1);
  line-height:125px;
}
.content > .form div:nth-child(3) > .txt_2 >input{
  width:50px;
  margin:0 10px;
  text-align: center;
}
.content > .form div:nth-child(3) > .txt_3{
  height:10px;
  position: absolute;
  margin-left: 80px;
  margin-top: 55px;
  font-size:15px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(19,20,76,1);
  line-height:125px;
}
.content > .form div:nth-child(3) > .txt_3 >.btn_1{
  width:15px;
  margin-left:5px;
}
.content > .form div:nth-child(3) > .txt_4{
  width:100%;
  height:200px;
  position: relative;
  margin-left: 0px;
  margin-top: 130px;
  padding-top:20px;
  /*background:#864;*/
  overflow-y:auto;
}
.content > .form div:nth-child(3) > .txt_4 > p{
  margin-left:60px;
}
.content > .form div:nth-child(3) > .txt_4 > .active{
  color:#5F87F9;
}
/*第四部分*/
.content > .form > div:nth-child(4){  
  width:100%;
  height:350px;
  position: relative;
  /*background: #486;*/
}

.content > .form > div:nth-child(4) > .img_1{
  width:38px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
}
.content > .form > div:nth-child(4) > .txt_1{
  position: absolute;
  margin-left: 80px;
  margin-top: 20px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:50px;
  width:80%;
  border-bottom:4px solid rgba(95,135,249,1);
}
.content > .form > div:nth-child(4) > .img_2{
  width:38px;
  position: absolute;
  margin-left: 90%;
  margin-top: 20px;
}
.content > .form > div:nth-child(4) > .sounds{
  position: absolute;
  width:80%;
  margin-left: 10%;
  margin-top: 80px;

}
/*第五部分*/
.content > .form > div:nth-child(5){  
  width:100%;
  height:350px;
  position: relative;
  /*background: #486;*/
}

.content > .form > div:nth-child(5) > .img_1{
  width:38px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
}
.content > .form > div:nth-child(5) > .txt_1{
  position: absolute;
  margin-left: 80px;
  margin-top: 20px;
  font-size:30px;
  font-family:Arial;
  font-weight:bold;
  color:rgba(95,135,249,1);
  line-height:50px;
  width:80%;
  border-bottom:4px solid rgba(95,135,249,1);
}
.content > .form > div:nth-child(5) > .img_2{
  width:38px;
  position: absolute;
  margin-left: 90%;
  margin-top: 20px;
}
.content > .form > div:nth-child(5) > .sounds{
  position: absolute;
  width:80%;
  margin-left: 10%;
  margin-top: 80px;

}
.content > .form > .save{
  width:20%;
  height:66px;
  background:rgba(95,135,249,1);
  border-radius:5px;
  margin-left:40%;
  margin-top:20px;
}
/*手机端样式*/
@media screen and (max-width: 900px) {
 
}





</style>
