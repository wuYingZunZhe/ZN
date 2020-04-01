Page({
  data: {
    routers: [{
        name: '商品分享',
        url: 'share',
        width: 60,
        height: 60
      },
      {
        name: '我要咨询',
        url: 'consult',
        width: 60,
        height: 60
      },
      {
        name: '我要售后',
        url: 'refund',
        width: 60,
        height: 60
      },
      {
        name: '我的提成',
        url: 'deduct',
        width: 60,
        height: 60
      },
      {
        name: '提现/记录',
        url: 'withdraw',
        width: 64,
        height: 64
      },
      /*{
        name: '销量比拼',
        url: 'sales',
        width: 58,
        height: 58
      },
      {
        name: '门店晒单',
        url: 'bask',
        width: 64,
        height: 64
      },
      {
        name: '图文提取',
        url: 'image-text',
        width: 68,
        height: 68
      },
      {
        name: '快捷报单',
        url: 'report',
        width: 48,
        height: 48
      },*/
      {
        name: '查看会员',
        url: 'member',
        width: 74,
        height: 48
      },
      {
        name: '扫一扫',
        url: 'scan',
        width: 74,
        height: 48
      },
      {
        name: '修改密码',
        url: 'password',
        width: 74,
        height: 48
      },
      /*{
        name: '门店录入',
        url: 'entering',
        width: 74,
        height: 48
      },
      {
        name: '配送评价',
        url: 'comment',
        width: 64,
        height: 58
      },*/
      {
        name: '门店歇业申请',
        url: 'close',
        width: 64,
        height: 58
      },
      /*{
        name: '代客下单',
        url: 'client',
        width: 64,
        height: 50
      }*/
    ],
   
  },
  //跳转到订单页面
  orderNav:function(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../order/order_'+index+'/order_'+index,
    })
  },
  canvas:function(sum,num){
    var context = wx.createCanvasContext('Canvas');
    var context2 = wx.createCanvasContext('Canvas');
    var array = [sum, num];
    var colors = ["rgb(17, 146, 233)", "rgb(17, 208, 233)","#008B8B" ];
    var total = 0;
    for (var val = 0; val < array.length; val++) {
      total += array[val];
    }
    var point = { x: 55, y: 55 };
    var radius = 50;
    for (var i = 0; i < array.length; i++) {
      context.beginPath();
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle(colors[i]);
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
    context.draw();
  },
  onLoad: function(options) {
    this.canvas(100,5);
  }
})