<template>
  <div class="my_body">

    <p  class="my_nav">
        <button @click="my_tab='1'" :class="{'active':my_tab=='1'}">代理入住</button>
        <button @click="my_tab='2'" :class="{'active':my_tab=='2'}">代理加盟</button>
    </p>

    <p  class="my_title"><span v-if="my_tab=='1'">代理入住</span><span v-if="my_tab=='2'">代理加盟</span></p>   
    <!----入住表单---->
    <div v-if="my_tab=='1'" class="my_form">
        <p>您的称呼：</p>
        <p>
            <input v-model="name" placeholder="请输入称呼">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!name">
        </p>
        <p>您的联系方式：</p>
        <p>
            <input v-model="mobile" placeholder="请输入联系方式">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!mobile">
        </p>
        <p>意向代理省市：</p>
        <p>
            <select  v-model="province" >
                <option :value ="item" v-for="(item,index) in all_province" :key="index" >{{item}}</option>
            </select>
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!province">
        </p>
        <p>
            <select  v-model="city">
                <option :value ="item" v-for="(item,index) in all_city" :key="index">{{item}}</option>
            </select>
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!city">
        </p>
        <p>详细地址：</p>
        <p>
            <input v-model="discrict" placeholder="请输入详细地址">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!discrict">
        </p>
        <p class="my_btn"><button @click="form_btn_1">申请入住</button></p>
    </div>
    <!----加盟表单---->
    <div v-if="my_tab=='2'" class="my_form">
        <p>您的称呼：</p>
        <p>
            <input v-model="name" placeholder="请输入称呼">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!name">
        </p>
        <p>您的联系方式：</p>
        <p>
            <input v-model="mobile" placeholder="请输入联系方式">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!mobile">
        </p>
        <p>意向代理省市：</p>
        <p>
            <select  v-model="province" >
                <option :value ="item" v-for="(item,index) in all_province" :key="index" >{{item}}</option>
            </select>
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!province">
        </p>
        <p>
            <select  v-model="city">
                <option :value ="item" v-for="(item,index) in all_city" :key="index">{{item}}</option>
            </select>
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!city">
        </p>
        <p>详细地址：</p>
        <p>
            <input v-model="discrict" placeholder="请输入详细地址">
            <img src="../../../static/imgs/icon/star.png" alt="" class="star" v-if="!discrict">
        </p>
        <p class="my_btn"><button @click="form_btn_2">申请加盟</button></p>
    </div>

    
    <!---打开弹出框--
    <mu-button @click="openSimpleDialog">打开弹出框</mu-button>
    -->
    <mu-dialog  width="360" :open.sync="dialogShow" transition='slide-top'>
        您的信息已成功提交，我们将尽快安排 客户代表与您取得联系，请保持手机畅通。
        <mu-button slot="actions" flat color="primary" @click="closeDialog">确定</mu-button>
    </mu-dialog>
    
 



   
  </div>
</template>

<script>
import {address} from './address.js'
export default {
  name: 'league',
  data () {
    return {
        my_tab: '1',
        name:'',
        mobile:'',
        province:'',
        city:'',
        discrict:'',

        dialogShow: false
        
    }

  },
  computed: {
      all_province:function () {
          let province_arr=[];
          for (let key in address) {         
              province_arr.push(key);
          }
          return province_arr
      },
      all_city:function (){
          return address[this.province];
      }
  },
  watch:{
      province(){
          this.city=this.all_city[0];
      }
  },
  mounted(){
      if(this.$route.query.id){
          this.my_tab=this.$route.query.id
      }else{
          this.my_tab=1
      }
  },
  methods:{
      //申请入住
      form_btn_1:function(){
          let that=this;
          //非空验证
          if(this.name==''){
              alert('请输入姓名')
              return
          }else if(this.mobile==''){
              alert('请输入手机号')
              return
          }else if(this.province==''){
              alert('请选择省市')
              return
          }else if(this.discrict==''){
              alert('请输入详细地址')
              return
          }
          //获取数据
          this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            })
          
      },
       //申请加盟
      form_btn_2:function(){
          let that=this;
          //非空验证
          if(this.name==''){
              alert('请输入姓名')
              return
          }else if(this.mobile==''){
              alert('请输入手机号')
              return
          }else if(this.province==''){
              alert('请选择省市')
              return
          }else if(this.discrict==''){
              alert('请输入详细地址')
              return
          }
          //发送数据
          this.axios.post('https://api.coindesk.com/v1/bpi/currentprice.json',{
              name:that.name,
              mobile:that.mobile,   
              province:that.province,
              city:that.city
          }).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            })
            
          
      },
      openDialog () {
        this.dialogShow = true;
      },
      closeDialog () {
        this.dialogShow = false;
      }
      
  }
}
</script>


<style scoped>
.my_body{
    background: #eee;
    padding-bottom: 20%;
}
p{
    font-family:SourceHanSansCN;
    font-weight:400;
    color:rgba(119,119,119,1);
}
.star{
    width:10px;
}
.my_nav{
    width:100%;
    margin:0;
    padding-top:10px;
    padding-right: 10%;
    text-align: right;
    
    font-size:20px;
}
.my_nav > button{
    font-size:12px;
    font-family:SourceHanSansCN;
    font-weight:400;
    color:rgba(119,119,119,1);
    border:0;
    background: #fff;
}
.my_nav > button:hover{
    background: rgba(255,39,79,1);
}
.my_nav > .active{
     background: rgba(255,39,79,1);
}
.my_title{
    width:100%;
    text-align: center;
    font-size:20px;
    color:rgba(51,51,51,1);
    font-weight:800;
}
.my_form{
    width:50%;
    margin-left:25%;
    padding:5% 10%;
    background: #fff;
    font-size:16px;
}
.my_form > p:nth-child(2),.my_form > p:nth-child(4),.my_form > p:nth-child(6),.my_form > p:nth-child(7),.my_form > p:nth-child(9){
    margin-left: 10%;
    
}
.my_form > p > select{
    width:180px;
    height: 30px;
    color:rgba(26,29,29,1);
}
.my_form > .my_btn{
    width:180px;
    margin-left:10%;
    text-align: center;
    
}
.my_form > .my_btn >button{
    width:114px;
    height:34px;
    background:rgba(255,39,79,1);
    border-radius:5px;
}

@media screen and (max-device-width:960px){
    .my_form{
        width:80%;
        margin-left:10%;
    }
    .my_btn{
        width:100%;
        margin-left: 0;
    }
}

</style>
