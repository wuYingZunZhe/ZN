<template>
  <div class='content'>
   
      
    
    <!-------统计图------------>
    
   


    <div ref="echar" style="width:50%;height:400px;"></div>
    
    

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'echarts',
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
            color:['#4472C5','#ED7C30','#80FF80','#FF8096','#800080'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:10, name:'第一天'},
                        {value:20, name:'第二天'},
                        {value:10, name:'第三天'},
                        {value:10, name:'第四天'},
                        {value:10, name:'第五天'}
                    ]
                }
            ]
        };

        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
   
  



  }
}
</script>
<style scoped>

</style>
