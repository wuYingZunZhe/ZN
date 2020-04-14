const app = getApp();
const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    navTextArr: ["全部", "消费者订单", "代客下单"],
    showModal: false,
//----------
    orderData:{},
    orderId:'',
    realName:'',
    userPhone:'',

  },

  navChange: function (e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },
 
  showModal() {
    this.setData({
      showModal: !this.data.showModal
    });

  },
  
  getToday: function () {
    let that = this;  
    request.getData(`/wechat/store/order/today?orderId=${that.data.orderId}&realName=${that.data.realName}&userPhone=${that.data.userPhone}`, (res) => {
      console.log('成功002:', res);
      that.setData({
        orderData: res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToday();
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