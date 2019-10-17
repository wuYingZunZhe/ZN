<template>
  <div class='content'>
   
      
    
    <!-------统计图------------>
    
   
    <canvas id="acanvas" width="500" height="500">
      您的浏览器不支持html5的canvas元素
    </canvas>
  

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
    this.drawLine();//第一块画布
    
  },
  methods: {
    //第一块画布 绘制扇形
    drawLine(){
      var myCanvas = document.querySelector('canvas');
      var ctx = myCanvas.getContext('2d');
      var ctx2=myCanvas.getContext("2d");//中层圆

      var w = ctx.canvas.width;
      var h = ctx.canvas.height;

      /*分成几等分*/
      var num = 30;
      /*间隔多少份*/
      var gap = 5;
      /*一份多少弧度*/
      var angle = Math.PI * 2 / num;

      /*原点坐标*/
      var x0 = w / 2;
      var y0 = h / 2;

      /*获取随机颜色*/
      var getRandomColor = function () {
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return 'rgb(' + r + ',' + g + ',' + b + ')';
      }
      var color=getRandomColor();

      /*上一次绘制的结束弧度等于当前次的起始弧度*/
      var startAngle = 0;
      for (var i = 0; i < num; i++) {
          var startAngle = i * angle;
          var endAngle = (i + 1) * angle;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.arc(x0, y0, 150, startAngle, endAngle);
          /*随机颜色*/
          if(i % gap == 0 || i==0){
            
            ctx.fillStyle = color;
          }else{
            ctx.fillStyle = '#ddd';//背景色
          }
          
          ctx.stroke();
          ctx.fill();
          //第二个圆
          ctx2.beginPath();
          ctx2.arc(x0, y0, 100, startAngle, endAngle);
          ctx2.fillStyle = '#eee';//背景色
          ctx2.stroke();
          ctx2.fill();
          //清除内侧描边线条
          var context=myCanvas.getContext('2d');
          context.beginPath();
          function clearArc(x,y,radius){//圆心(x,y)，半径radius
            var calcWidth=radius-stepClear;
            var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);
            
            var posX=x-calcWidth;
            var posY=y-calcHeight;
            
            var widthX=2*calcWidth;
            var heightY=2*calcHeight;
            
            if(stepClear<=radius){
              context.clearRect(posX,posY,widthX,heightY);
              stepClear+=1;
              clearArc(x,y,radius);
            }
          }
          var stepClear=1;//别忘记这一步
          clearArc(x0,y0,100);//清除画布
    }
},

    
   
  



  }
}
</script>
<style scoped>

</style>
