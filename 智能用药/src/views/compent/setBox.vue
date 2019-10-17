<template>
<div >

    <el-button type="text set" @click="dialogVisible = true">
        <img class="img_2" src="../../../static/imgs/set.png"  alt="">
        <span> set</span>
    </el-button>

    <!----弹出框---->
    <div class="timeBox">

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span>设置时间</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>

</div>
</template>

<script>
  export default {
    name: 'set',
    data() {
      return {
        dialogVisible: false,
        
      };
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

  };
</script>
<style scoped>

</style>
