const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "phoneNumber": "18888888888",//手机号
    "password": "123",//密码
    "verify": '123',//确认密码
    isAgree: false,//表单信息是否填完
    showLoading: false,//是否显示loading
  },
  // 手机输入框
  binPhone: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    wx.setStorageSync('phoneNumber', e.detail.value);
    console.log(wx.getStorageSync('phoneNumber'));
  },
  // 密码输入框
  binPsd: function (e) {
    this.setData({
      password: e.detail.value
    })
    wx.setStorageSync('password', e.detail.value);
    console.log(wx.getStorageSync('password'));
  },
  // 密码确认框
  binVer: function (e) {
    this.setData({
      verify: e.detail.value
    })
  },
  // 店铺登陆
  binLogin: function (e) {

    let that = this;
    let phone = that.data.phoneNumber;
    let psd = that.data.password;
    let verify = that.data.verify;
    // 手机号验证
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
    // 密码确认验证
    if (verify == '') {
      wx.showToast({
        title: '请确认密码',
        icon: 'success',
        duration: 2000
      })
      return
    } else {
      if (verify != psd) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'success',
          duration: 2000
        })
        return
      }
    }
    console.log('验证成功')

    // // 店铺登陆
    that.setData({
      showLoading: true
    })
   
    console.log("店铺登陆")
    wx.request({
      url: app.globalData.baseUrl + "/wechat/store/api/login",
      data: {
        "phoneNumber": that.data.phoneNumber,
        "password": that.data.password
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log("登陆成功：", res.data.msg)
        // 存储Token
        wx.setStorageSync('phoneNumber', that.data.phoneNumber);
        wx.setStorageSync('password', that.data.password);
        wx.setStorageSync('storeToken', res.data.msg);
        that.setData({
          showLoading: false
        })
        wx.navigateTo({
          url: '../../home/home'
        })
      },
      fail: function (err) {
        console.log("登陆失败：", err)
        that.setData({
          showLoading: false
        })
        wx.showToast({
          title: '登陆失败',
          icon: 'none',
          duration: 2000
        })
        // wx.navigateTo({
        //   url: '../index/index'
        // })
      }
    })
  },
  //相关条款
  bindAgreeChange: function () {
    let that = this;
    that.setData({
      isAgree: !(that.data.isAgree)
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