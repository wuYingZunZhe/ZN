// pages/payment/payment.js
var app = getApp();
var md5 = require('../../utils/md5.js');
var md51 = require('../../utils/md51.js');
var util = require('../../utils/util.js');

var store_id='';
var order_id='';
var user_id='';
var newopenid1='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename: '支付',
    redBack: 1,
    istoStore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let store_info = wx.getStorageSync('store_info');
    user_id=options.user_id;
    store_id=options.store_id;
    order_id = options.order_id;
    newopenid1 = options.newopenid1;
    this.setData({
      store_name:store_info.store_name,
      store_logo: store_info.store_logo,
      actual_money: options.actual_money
    })
    this.countdown();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  closeshowModal() {
    this.setData({
      istoStore: false
    })
  },
  toHome: function () {
    this.setData({
      istoStore: true
    })
  },
  istoStore() {
    // let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    // let prevPage = pages[pages.length - 2];
    
    // wx.navigateBack({
    //   delta: 1  // 返回上一级页面。
    // })

    app.globalData.order_status = 1;
    wx.switchTab({
      url: '/pages/myorder/myorder',
    })
  },

  countdown(remainTime) {
    console.log('countdown', 174)
    let that = this;
    let msg='';
    let maxtime=19*60+59;
    let timer=null;
    clearInterval(timer);
    timer = setInterval(function () {
      if (maxtime > 0) {
        let min = Math.floor(maxtime / 60);
        let sec = Math.floor(maxtime % 60);
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        
        msg = min + '分' + sec + ' 秒';
        --maxtime;
      } else {
        clearInterval(timer);
        msg = ''// 结束文案
      }
      that.setData({
        msg
      })
    }, 1000)
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
  payForWechat: function () {
    var that = this;

    let gram=util.returnGram();
    let userInfokey = wx.getStorageSync('userInfokey');
    var globalKey = wx.getStorageSync('globalKey');
    var store_info = wx.getStorageSync('store_info');
    console.log(globalKey)
    newopenid1 = globalKey.newopenid1;
    user_id=globalKey.user_id;
    var token=gram.token;
    //支付订单
    wx.request({
      url: app.globalData.url+'/api/mini_program/get_prepay_id',
      data: {
        request_object: app.globalData.request_object,
        store_id,
        user_id,
        openid: newopenid1,
        token,
        timestamp: gram.timestamp,
        process: gram.process,
        order_id,
        paid_type: 2,
        remark: that.data.textareaValue || store_info.textareaValue || '',//备注
        table_number: that.data.table_number || store_info.table_number ||'',
        people_count: that.data.people_number || store_info.people_number || '',
      },
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("支付账单返回数据", res.data)
        //此时应调用微信支付界面
        if (res.data.status == 1) {
          
          let strmd5 = 'appId=' + res.data.data.appid + '&nonceStr=' + res.data.data.noncestr + '&package=prepay_id=' + res.data.data.prepayid + '&signType=MD5&timeStamp=' + res.data.data.timestamp + '&key=rImE3xCA7U22TWYxFvA2eYq4Umy1NVgP';
          let mypaySign = md51.md5(strmd5);
          let mypackage = 'prepay_id=' + res.data.data.prepayid;

          //此时应调用微信支付界面
          if (res.data.status == 1) {
            wx.requestPayment({
              timeStamp: res.data.data.timestamp,
              nonceStr: res.data.data.noncestr,
              package: mypackage,
              signType: 'MD5',
              paySign: mypaySign,
              success(res) {
                console.log(res)
                if (res.errMsg == "requestPayment:ok") {
                  wx.redirectTo({
                    url: '../code/code?store_id=' + store_id + '&order_id=' +order_id+ '&user_id=' + user_id + '&token=' + token + '&newopenid1=' + newopenid1 + '&store_name=' + that.data.store_name + '&actual_money=' + that.data.actual_money
                  })
                }
              },
              fail(res) {
                console.log(94, res)
              }
            })
            // 将缓存的ol清空
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
            // console.log("咋啦", res.data)
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
          })
          // console.log("咋啦", res.data)
        }
      },
      fail: function () {
        // fail
        console.log("支付订单请求失败");

        wx.showToast({
          title: "支付订单请求失败",
          icon: 'none',
          duration: 2000,
        })
      },
      complete: function () {
        // complete
      }
    })
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

    app.onshare()

  },
})