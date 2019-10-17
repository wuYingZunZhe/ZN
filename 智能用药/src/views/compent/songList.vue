<template>
<div>
  <input v-show='!ifShow' class="input_txt"></input>
  <div class="contentpanel-layout" v-if='ifShow'>
    <div class="contentview-layout bottom-in">
      <div class="contentview-main" style="padding: 10px 0px 10px 10px;">
        <div class="search-box" style="width:200px;">
          <el-popover placement="bottom-start" :width="width" v-model="visible" trigger="manual">
            <el-table :data="list" :height="height" @row-click="onClickItem" @row-dblclick="onDblClickSelect">
              <el-table-column property="name" label="名称"></el-table-column>
              <el-table-column property="spec" label="规格"></el-table-column>
              <el-table-column property="price" label="价格"></el-table-column>
            </el-table>
            <div slot="reference">
              <el-input placeholder="请输入内容" v-model="value" @focus="handleFocus" @blur="handleBlur"></el-input>
            </div>      
          </el-popover>
        </div>    
      </div>
    </div> 
  </div>
  </div>
</template>
<script>
export default {
  name: 'seek',
  data () {
    return {
      width:600,
      height:300,
      visible: false,
      value:'',
      list:[
        {name:'阿莫西林11',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒22',spec:'盒',price:'1.2'},
        {name:'阿莫西林33',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒44',spec:'盒',price:'1.2'},
        {name:'阿莫西林55',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒66',spec:'盒',price:'1.2'},
        {name:'阿莫西林77',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒88',spec:'盒',price:'1.2'},
        {name:'阿莫西林99',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒1010',spec:'盒',price:'1.2'},
        {name:'阿莫西林1111',spec:'瓶',price:'1.2'},
        {name:'感冒灵颗粒1212',spec:'盒',price:'1.2'},
        {name:'阿莫西林1313',spec:'盒',price:'1.2'},
        {name:'感冒灵颗粒1414',spec:'盒',price:'1.2'},
        {name:'阿莫西林1515',spec:'盒',price:'1.2'},
      ], 
      ifShow:true,
    }
  },
  mounted(){
    this.show();
  },
  methods:{
    handleFocus(){
      this.visible = true;
    },
    handleBlur(){
      this.visible = false;
    },
    onClickItem(row){
      console.log("单击选中了一行");
      console.log(row.name);
      this.value = row.name;
      this.visible = false;
    },
    onDblClickSelect(row){
      console.log('选中了一行');
      console.log(row);
      this.value = row.name;
      this.visible = false;
    },
    show(){
      //console.log(document.body.clientWidth)
      if(document.body.clientWidth>=900){
        this.ifShow=true;
      }else{
        this.ifShow=false;
      }
    }
  }
}
</script>
<style type="text/css" scope>
.input_txt{
  width:80%;
  text-align:center;
}
</style>