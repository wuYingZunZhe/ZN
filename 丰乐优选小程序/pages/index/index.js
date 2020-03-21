var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    time: '',
    show_if: false,
    show_if_2: false,
    classify: [//店铺图标测试数据
      [
        { id: '0', name: '蔬菜馆', url: '/static/temp/c8.png' },
        { id: '1', name: '水果馆', url: '/static/temp/c1.png' },
        { id: '2', name: '蔬菜馆', url: '/static/temp/c2.png' },
        { id: '3', name: '肉肉馆', url: '/static/temp/c3.png' },
        { id: '4', name: '家禽馆', url: '/static/temp/c4.png' },
        { id: '5', name: '水产馆', url: '/static/temp/c5.png' },
        { id: '6', name: '蛋蛋馆', url: '/static/temp/c6.png' },
        { id: '7', name: '生鲜批发', url: '/static/temp/c7.png' },
      ],
      [
        { id: '9', name: '家庭批发', url: '/static/temp/c2.png' },
        { id: '10', name: '牛奶馆', url: '/static/temp/c4.png' },
        { id: '11', name: '烘焙馆', url: '/static/temp/c5.png' }
      ]
    ],
  },


  //消息通知
  news: function () {
    var that = this;
    let t = 0;
    that.setData({
      show_if_2: true,
      name: '李四',
      time: '10秒'
    })
    that.setData({
      marginTop: 100
    })
    //定时器
    var timer = setInterval(function () {
      t = t + 1;
      if (t > 3) { //消息停留时间
        clearInterval(timer)
        that.setData({
          show_if_2: false,
          marginTop: 150
        })
      }
    }, 1000)
  },
  //
  shop:function(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
  },
  //跳转到商品详情页面
  toProduct:function(){
    wx.navigateTo({
      url: '../product/product',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.news()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.updateBlogs()
  },
  updateBlogs: function () {
    var that = this
    console.log('到底了！')
    /*
    wx.request({
      url: common.baseUrl + 'blog_rss.php',
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var feeds = feed.getBlogs(res.data);
        wx.setStorage({
          key: "blog_feeds",
          data: feeds
        })

        that.setData({
          feeds: feeds
        })
      }
    })*/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})