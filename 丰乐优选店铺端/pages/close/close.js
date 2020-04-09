// pages/order/order_1/order_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,//是否显示弹出框
    queryDate:'',
  },
  //弹出框显示隐藏
  showModal() {
    this.setData({
      showModal: !this.data.showModal
    });

  },
  //时间选择器
  bindDateChange: function (e) {
    let date = e.detail.value;
    this.setData({
      queryDate: e.detail.value,
    })
  },
  //电话输入验证
  bindPhoneInput(e) {
    let phone = this.ifNum(e.detail.value)
    this.setData({
      phone
    })
  },
  // 是否为数字
  ifNum(val) {
    return val.replace(/\D/g, '')
  },
  //歇业确认按钮 
  confirm:function(){
    console.log('确认歇业');
    this.showModal();
    wx.navigateTo({
      url: '../home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showModal();
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