// pages/index/find/reset/reset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:'',
    passWord:'',
    verify:'',
  },
  //重置密码
  reset: function () {
    let that = this;
    console.log('0123');
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/rePassword",
      header: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      data: {
        "password": that.data.phoneNumber,
        "code": that.data.code
      },
      success: function (res) {
        console.log(res)
        if (res.data.msg.code == 200) {
          wx.navigateTo({
            url: './reset/reset'
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.code
    })
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