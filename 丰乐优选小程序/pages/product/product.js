//获取应用实例
const app = getApp()

Page
  (
  {
    data:
    {
      current: 0,//当前内容区块
      imgList: ['/static/temp/c1.png', '/static/temp/c2.png', '/static/temp/c3.png'],
      scrollTop: 0,//商品信息区视图高度
      liveShow:true,//是否显示直播模块

    },


    //导航栏点击切换
    switchSlider: function (e) {
      this.setData({
        current: e.target.dataset.index
      })
    },
    //内容区左右滑动
    changeSlider: function (e) {
      this.setData({
        current: e.detail.current
      })
    },
    //查看基本信息
    toProductInfo: function () {
      this.setData({
        current: '1',
        scrollTop: '0',
      })
    },
    //跳转到订单生成页面
      submit: function () {
        wx.redirectTo({
          url: '/pages/order/createOrder'
        });

      },



  }
  )


