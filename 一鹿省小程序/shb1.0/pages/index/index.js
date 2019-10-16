//logs.js
var app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    isPhone: false,
    hasPhone: false,
    isClose: true,    //判断当前页面是打开还是返回页
    isUser: false,
    hasUser: false,
  },
  onLoad: function (option) {
    let that=this;
    app.checkOpenid().then(() => {
      that.checkPhone()
    })
  },
  checkPhone(){
    let globalKey = wx.getStorageSync('globalKey');
    if (globalKey.hasOwnProperty('newuser1') && app.globalData.newopenid1 != '' || globalKey.hasOwnProperty('newuser1') && globalKey.hasOwnProperty('newopenid1')) {
      this.setData({ hasUser: true })
    }
    let hasPhone = false;
    if (app.globalData.user_phone != '' || globalKey.hasOwnProperty('user_phone') && globalKey.user_phone != '') {
      hasPhone = true;
    }
    this.setData({
      hasPhone
    })
    app.getquery(app.globalData.query, globalKey)
  },
  getPhoneNumber(e) {
    let that = this;
    app.getPhoneNumber(e, that, 2)
  },
  toIndex() {
    let globalKey = wx.getStorageSync('globalKey')
    if (app.globalData.query) {
      // if (globalKey.hasOwnProperty("newuser1")) {
      app.getquery(app.globalData.query, globalKey, 1)
      // }else{
      //   wx.hideLoading();
      // }
    }
    // util.reLaunchindex();
  },
  getUserInfo(e) {
    let that = this;
    app.getUserInfo(e, that, 2)
  },
  onUnload: function () {
    var that = this
    setTimeout(function () {
      that.setData({ isClose: true })
    }, 200)

  },
  onHide: function () {
    if (this.data.isClose) {
      console.log('重新打开')
    }
  },
  onShow: function () {
  },
})
