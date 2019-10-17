<template>
  <div>
   
      
    
    <!-------统计图------------>
    <div ref="echar" style="width:100%;height:100%;"></div>
    
    

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'hello',
  data () {
    return {
      
    }
  },
  watch:{
    
  },
  mounted(){
    this.drawLine();
    
  },
  methods: {
    //绘制统计表
    drawLine(){
        var myChart = echarts.init(this.$refs.echar);// 初始化echarts实例
        var option = {
          angleAxis: {
          },
          radiusAxis: {
              type: 'category',
              data: ['药一', '药二', '药三', '药四'],
              z: 10
          },
          polar: {
          },
          series: [{
              type: 'bar',
              data: [8, 2, 3, 4  ],
              coordinateSystem: 'polar',
              name: '第一次间隔',
              stack: 'a'
          }, {
              type: 'bar',
              data: [6, 4, 6, 8],
              coordinateSystem: 'polar',
              name: '第二次间隔',
              stack: 'a'
          }, {
              type: 'bar',
              data: [1, 2, 3, 4],
              coordinateSystem: 'polar',
              name: '第三次间隔',
              stack: 'a'
          }],
          legend: {
              show: true,
              data: ['第一次间隔', '第二次间隔', '第三次间隔']
          }
      };

        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
   
  



  }
}
</script>
<style scoped>

</style>
