var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qr:false,
    nickName : null,
    avatarUrl:null,
    phone: null,
    
    userInfo:{},
  },
  // 二维码弹窗开启
  qr: function () {
    this.setData({
      qr: true
    })
  },
  // 二维码弹窗关闭
  close_mask: function () {
    this.setData({
      qr: false
    })
  },
  //获取手机号
  getPhoneNumber:function(res){
    console.log('res',res);
  },
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },
  toOrder:function(e){
    //console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    //console.log(index);
    wx.navigateTo({
      url: `/pages/order/order?state=${index}`,
    })
    
  },

  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
  //跳转到选择自提点页面
  toAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //跳转到首页
  goShop:function(){
    wx.switchTab({
      url: '/pages/index/index'
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