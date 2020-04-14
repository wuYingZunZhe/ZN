const app = getApp();
const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "phoneNumber": "18888888888",
    "password": "123",
    isAgree: false,
  },
  binPhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log(e.detail.value)
    wx.setStorageSync('phoneNumber', e.detail.value);
  },
  binPsd: function(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(e.detail.value)
    wx.setStorageSync('password', e.detail.value);
  },
  binLogin: function(e) {
    let that = this;
    let phone = that.data.phoneNumber;
    let psd = that.data.password;
    console.log(phone, psd)

    if (phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    if (psd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/login",
      header: {
        'context-type': 'application/json'
      },
      method: 'post',
      data: {
        phoneNumber: that.data.phoneNumber,
        password: that.data.password,
      },
      success: function(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading()
        wx.hideLoading()

        if (res.data.code == '200') {
          wx.setStorageSync('phoneNumber', that.data.phoneNumber);
          wx.setStorageSync('password', that.data.password);
          wx.setStorageSync('storeToken', res.data.msg);
          console.log(wx.getStorageSync('phoneNumber'));
          console.log(wx.getStorageSync('password'));
          wx.navigateTo({
            url: '../../home/home'
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(err){
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //相关条款
  bindAgreeChange: function() {
    let that = this;
    that.setData({
      isAgree: !(that.data.isAgree)
    })
  },
  //忘记密码 
  forget: function() {
    console.log('123');
    wx.navigateTo({
      url: `../find/find?phone=${this.data.phoneNumber}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // app.getUserInfo(); //获取个人信息
    // this.setData({
    //   "phoneNumber": wx.getStorageSync('phoneNumber')? wx.getStorageSync('phoneNumber'):'',
    //   "password": wx.getStorageSync('password') ? wx.getStorageSync('password') : wx.getStorageSync('password'), 
    // })

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