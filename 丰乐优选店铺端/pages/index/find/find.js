const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "18888888888", //手机号
    code:'',//验证码
    
  },
  // 发送验证码
  sendMsg:function(){
    let that =this;
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/sendSMS/" + that.data.phoneNumber,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
    })

  },
  //找回密码
  find:function(){
    let that =this;
    console.log('0123');
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/rePassword/" + that.data.phoneNumber,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      data:{
        "password": that.data.passWord,
        "code": that.data.code
      },
      success: function (res) {
        console.log(res)
        if (res.data.msg.code == 200){
          wx.navigateTo({
            url: '/pages/index/login/login'
          })
        }
      },
    })
  },
  //手机号输入框 
  binPhone:function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  //验证码输入框 
  binCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //密码输入框 
  binpassWord: function (e) {
    this.setData({
      passWord: e.detail.value
    })
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