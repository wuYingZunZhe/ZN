const util = require('../../utils/getTimeLeft.js')
const app = getApp()


Page
  ({
    data: {
      seleIndex: 0,//记录当前点击的类目
      navText: [ 
        "基本信息",
        "购买记录",
      ],
      
      imgList: ['/static/temp/c1.png', '/static/temp/c2.png', '/static/temp/c3.png'],
      scrollTop: 0, //商品信息区视图高度
      liveShow: false, //是否显示直播模块
      datetimeTo: "2020/05/29 9:28:00 ", // 倒计时结束时间
      timeLeft: "" ,// 剩下的时间
      cartNum: 5,//购物车数量
    },

    //导航栏点击切换
    cut(e) {
      this.setData({
        seleIndex: e.currentTarget.dataset.index
      })
    },
    //内容区左右滑动
    changeSlider: function(e) {
      console.log(e)
      this.setData({
        seleIndex: e.detail.current
      })
    },
    //查看基本信息
    toProductInfo: function() {
      this.setData({
        seleIndex: '0',
        scrollTop: '0',
      })
    },
    //加入购物车
    addCart:function(){
      wx.showToast({
        title: '加入购物车！',
        icon: 'success',
        duration: 2000
      })
      
    },
    //立即购买
    buyNow: function() {
      wx.redirectTo({
        url: '/pages/order/createOrder'
      });
    },
    //活动倒计时
    nowTime: function() {
      this.data.timer = setInterval(() => {
        this.setData({
          timeLeft: util.getTimeLeft(this.data.datetimeTo)
        });
        if (this.data.timeLeft.indexOf("-") != '-1') {
          clearInterval(this.data.timer);
          this.setData({
            timeLeft: "已结束"
          })
        }
      }, 1000);
    },
    onShow: function() {
      this.nowTime();
    },
    //商品分享
    onShareAppMessage: (res) => {
      if (res.from === 'button') {
        console.log("来自页面内转发按钮");
        console.log(res.target);
      }
      else {
        console.log("来自右上角转发菜单")
      }
      return {
        title: '商品名称',
        path: '/pages/product/product?id=123',//分享页面路径和参数
        //imageUrl: "../images/1.png",//商品图片
        desc: '商品介绍...',
        success: (res) => {
          console.log("转发成功", res);
          console.log("成功了")
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }
  })