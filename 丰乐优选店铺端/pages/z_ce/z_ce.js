//index.js
//获取应用实例
const app = getApp();
// 这里写你的js路径
var request = require('../../utils/request');

Page({
  data: {

  },
  ce: function() {
    app.test();
    // let postData = {
    //   "phoneNumber": wx.getStorageSync('phoneNumber'),
    //   "password": wx.getStorageSync('password')
    // };
    // request.check('/wechat/store/api/login', 'post', postData, (res)=>{
    //   console.log('成功:', res);
    // });
  },
  test: function () {
    console.log('123')
    let postData = {
      "phoneNumber": wx.getStorageSync('phoneNumber'),
      "password": wx.getStorageSync('password')
    };
    request.check('/wechat/store/api/login', 'post', postData, (res) => {
      console.log('成功:', res);
    });
  },
  
})