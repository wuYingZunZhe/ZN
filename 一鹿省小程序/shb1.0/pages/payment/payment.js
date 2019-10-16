// pages/payment/payment.js
var app = getApp();
var md5 = require('../../utils/md5.js');
var md51 = require('../../utils/md51.js');
var util = require('../../utils/util.js');
var timestamp = 0;

let userInfokey = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename:'付款',
    remarks:[], //备注
    category:false,//是否显示桌号
    store_name:'',
    isMask:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let store_info= wx.getStorageSync('store_info');
      this.setData({
        img: app.globalData.store_logo || store_info.store_logo,
        store_name: app.globalData.store_name || store_info.store_name,
      })
  },

  // 备注
  handleContentInput(event) {
    let textareaValue = event.detail.value;
    this.data.userInput = textareaValue;
    

  },
  formatNum : function(e) {  //正则验证金额输入框格式  
    let value = e.detail.value;
    value = value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')    
    value = value.replace(/[\u4e00-\u9fa5]+/g, ""); //清除汉字    
    value = value.replace(/[^\d.]/g, ""); //清楚非数字和小数点     
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //只保留第一个小数点, 清除多余的   
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是小数点      
   
    this.setData({
      value
    })
   }, 
  handleInput:function(e){    
    var that = this;   
      that.formatNum(e);    
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
    userInfokey = wx.getStorageSync('userInfokey');
    let store_info = wx.getStorageSync('store_info')

    console.log(store_info, app.globalData.category_id)
    if (store_info.category_id =='1' || app.globalData.category_id=='1'){
      this.setData({
        category: true, isMask:false
      })
    }
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
  // 桌号
  table_numbe: function (e) {
    let table_number = e.detail.value;
    this.data.table_number = table_number;
    
  },
  payForWechat:function(){//微信支付
    let that=this
    let userInfokey = wx.getStorageSync('userInfokey');
    let globalKey = wx.getStorageSync('globalKey');
    var store_info = wx.getStorageSync('store_info');
    let token = app.globalData.token || globalKey.token
    var store_id = app.globalData.store_id || store_info.store_id;
    timestamp= Date.parse(new Date());
    var val = 'fanbuyhainan' + timestamp.toString() + token;
    var hexMD5 = md5.hexMD5(val);
    let payment_money = that.data.value
    wx.request({
      url: app.globalData.url+'/api/mini_program/payment',
      data: {
        request_object: app.globalData.request_object,
        user_id: app.globalData.user_id || globalKey.user_id,
        token: token,
        timestamp: timestamp,
        process: hexMD5,
        store_id,
        openid: app.globalData.newopenid1 || globalKey.newopenid1,
        remark: that.data.userInput || '',
        table_number: that.data.table_number || store_info.table_number||'',
        people_number: that.data.people_number || store_info.people_number || '',
        payment_money,
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("payment", res)
        let strmd5 = 'appId=' + res.data.data.appid + '&nonceStr=' + res.data.data.noncestr + '&package=prepay_id=' + res.data.data.prepayid + '&signType=MD5&timeStamp=' + res.data.data.timestamp + '&key=rImE3xCA7U22TWYxFvA2eYq4Umy1NVgP';
        let mypaySign = md51.md5(strmd5);
        let mypackage = 'prepay_id=' + res.data.data.prepayid;
        console.log(mypackage)
       
        //此时应调用微信支付界面
        if (res.data.status == 1) {
          wx.requestPayment({
            timeStamp: res.data.data.timestamp,
            nonceStr: res.data.data.noncestr,
            package: mypackage,
            signType: 'MD5',
            paySign: mypaySign,
            success(res) {
                wx.showModal({
                  title: '支付成功',
                  content: '您将在“微信支付”官方号中收到支付凭证',
                })
                that.setData({
                  isMask:true
                })
            },
            fail(res) {
              console.log(94, res)
              if (res.data.message) {
                wx.showModal({
                  title: '支付失败',
                  content: res.data.message,
                })
              }
            }
          })
          // 将缓存的ol清空
        } else {
          if (res.data.message) {
            wx.showModal({
              title: '支付失败',
              content: res.data.message,
            })
          }
        }
      },
      fail: function () {
        // fail
        console.log("支付订单请求失败");
        wx.showModal({
          title: '支付失败',
          content: '支付订单请求失败',
        })

      },
      complete: function () {
        // complete
      }
    }) 
    
   
  } ,
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

    app.onshare()

  },
})