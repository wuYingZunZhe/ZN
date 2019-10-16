// pages/businessQualification/businessQualification.js
var app = getApp();
var util = require('../../utils/util.js');
var user_id='';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename: '营业资质',
      businessQualification:[],
      pics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user_id = options.user_id
    // console.log(options)
      var that = this;
      wx: wx.request({
          url:app.globalData.url+ '/api/store_detail/get_business_info',
        data: {
          request_object: app.globalData.request_object,
          user_id,
          store_id: options.store_id || wx.getStorageSync('store_info').store_id
          },
          header: {},
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
              // console.log(res.data);
              if (!res.data.data){
                  return;
              }
              
              var data = res.data.data;
            var list_pic = util.addUrl(data.list_pic, 'pic');   
            console.log(list_pic, 40, data.list_pic)
            
            that.setData({
                businessQualification: data,
              pics: list_pic
            })
             
          },
        fail: function (res) {
          app.showMind();
        },
          complete: function (res) { },
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
  onShareAppMessage: function (res) {
    let store_info = wx.getStorageSync('store_info');
    let title = '我在一鹿省边省边赚，你也快来吧！';
    let that = this;
    if (res.from === 'menu') {
      console.log(res)
    }
    return {
      title,
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_info.store_id + '&store_name=' + store_info.store_name,
      success: function (res) {

      }
    }

  },
})