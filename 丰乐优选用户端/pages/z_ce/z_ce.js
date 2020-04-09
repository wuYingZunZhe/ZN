const app = getApp()
const request = require('../../utils/request.js')

Page({
  data: {

  },
  getToken: function() {
    wx.request({
      url: "http://192.168.0.118:8080/wechat/store/api/login",
      data: {
        "phoneNumber": "18888888888",
        "password": "123"
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        console.log(res.data.msg)
      }
    })
  },
  onLoad: function() {
      //  app.getToken();
    //app.getUserInfo();
    // console.log(app.globalData)
    request.getToken()
  }
})