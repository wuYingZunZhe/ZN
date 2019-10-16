// pages/code/code.js
var app = getApp();
var md5 = require('../../utils/md5.js');
var md51 = require('../../utils/md51.js');
var util = require('../../utils/util.js');
var store_id='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename: '验证码',
    redBack: '1',
    myQrcodeSrc:[],
    showCode:false,
    order_code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    store_id = options.store_id;
    var that = this;
    let gram = util.returnGram();
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:5000
    })
    let timer=setTimeout(function(){
      wx.request({
        url: app.globalData.url + '/api/store_order/get_order_code',
        data: {
          request_object: app.globalData.request_object,
          user_id: options.user_id,
          order_id: options.order_id,
          timestamp: gram.timestamp,
          process: gram.process,
          token: gram.token
        },
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.status == 1) {
            let codedata = res.data.data;
            console.log("我的订单详情返回数据", res.data)
            let qrcode_pic = app.globalData.url + codedata.qrcode_pic;
            let myQrcodeSrc = [];

            myQrcodeSrc.push(qrcode_pic)
            let mobile = codedata.mobile + '';
            let arr = mobile.split("");
            arr.splice(3, 4, "****");
            mobile = arr.join("");
            that.setData({
              store_name: codedata.store_name,
              qrcode_pic,
              myQrcodeSrc,
              qrcode_url: codedata.qrcode_url,
              order_status: codedata.order_status,
              order_code: codedata.order_code,
              mobile: mobile,
              list_goods: codedata.list_goods,
              add_time: codedata.add_time,
              order_sn: codedata.order_sn
            })
            clearTimeout(timer);
            let store_info = wx.getStorageSync('store_info');
            store_info.table_number='';
            wx.setStorageSync('store_info', store_info)
          } else {
            wx.showModal({
              title: '加载失败',
              content:'是否返回我的订单页面查看?',
              success(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '/pages/myorder/myorder',
                  })
                }else if(res.cancel){

                }
              }
            })
            console.log("我的订单详情请求失败", res.data)
          }
        },
        fail: function () {
          // fail
          console.log("服务器响应失败");

          app.showMind();
        },
        complete: function () {
          // complete
        }
      })

    },3000)
  },
  // 放大二维码
  tapQrcode(e) {
    let myQrcodeSrc = this.data.myQrcodeSrc;
    wx.previewImage({
      urls: myQrcodeSrc, showCode:true,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  navigate(){
    app.globalData.order_status = 2;
    wx.switchTab({
      url: '/pages/myorder/myorder',
    })
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

    let globalKey = wx.getStorageSync('globalKey');
    let title = '我在一鹿省边省边赚，你也快来吧！';
    let that = this;
    if (res.from === 'menu') {
      console.log(res)
    }
    return {
      title,
      imageUrl: '/images/5.png',
      path: 'pages/home/index?&user_id=' + globalKey.user_id,
      success: function (res) {
        console.log(res)

      }
    }
  }
})