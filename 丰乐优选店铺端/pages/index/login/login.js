const app = getApp();
const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "phoneNumber": "18888888888", //手机号
    "password": "123", //密码
    isAgree: false, //表单信息是否填完
    showLoading: false, //是否显示loading
  },
  // 手机输入框
  binPhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    wx.setStorageSync('phoneNumber', e.detail.value);
    console.log(wx.getStorageSync('phoneNumber'));
  },
  // 密码输入框
  binPsd: function(e) {
    this.setData({
      password: e.detail.value
    })
    wx.setStorageSync('password', e.detail.value);
    console.log(wx.getStorageSync('password'));
  },
  
  // 店铺登陆
  binLogin: function(e) {

    let that = this;
    let phone = that.data.phoneNumber;
    let psd = that.data.password;
    
    if (phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'success',
        duration: 2000
      })
      return
    } else {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
        return
      }
    }
    // 密码验证
    if (psd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'success',
        duration: 2000
      })
      return
    }
    
    console.log('验证成功')

    // // 店铺登陆
    that.setData({
      showLoading: true
    })



    let postData = {
      phoneNumber: that.data.phoneNumber,//手机号
      password: that.data.password,//账户密码
    };
    request.check('/wechat/store/api/login', 'post', postData, (res) => {
      console.log('成功:', res);
    });






  },
  //相关条款
  bindAgreeChange: function() {
    let that = this;
    that.setData({
      isAgree: !(that.data.isAgree)
    })
  },
  //忘记密码 
  forget:function(){
    console.log('123');
    wx.navigateTo({
      url: '../find/find'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getUserInfo(); //获取个人信息
    this.setData({
      province: wx.getStorageSync('address').ad_info.province,
      city: wx.getStorageSync('address').ad_info.city,
      latitude: wx.getStorageSync('address').ad_info.location.lat,
      longitude: wx.getStorageSync('address').ad_info.location.lng,
      userInfo: wx.getStorageSync('userInfo'),
    })
    console.log('852', this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})