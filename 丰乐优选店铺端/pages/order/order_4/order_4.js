// pages/order/order_1/order_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,//记录当前点击的类目
    navTextArr: ["全部", "消费者订单", "代客下单"],
    showModal: false,//是否显示弹出框
  },
  //导航栏点击切换
  navChange: function (e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },
  //弹出框显示隐藏
  showModal() {
    this.setData({
      showModal: !this.data.showModal
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})