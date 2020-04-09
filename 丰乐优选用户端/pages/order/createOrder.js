// pages/z_ce/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskState: 0, //优惠券面板显示状态
    desc: '', //备注
    payType: 1, //1微信 2支付宝
    couponList: [{
      title: '新用户专享优惠券',
      price: 5
    },

    {
      title: '庆五一发一波优惠券',
      price: 10
    },

    {
      title: '优惠券优惠券优惠券优惠券',
      price: 15
    }
    ],


    addressData: {
      name: '许小星',
      mobile: '13853989563',
      addressName: '金九大道',
      address: '山东省济南市历城区',
      area: '149号',
      default: false
    }
  },
  //显示优惠券面板
  toggleMask: function (type) {
    var _this = this;
    var timer = type === 'show' ? 10 : 300;
    var state = type === 'show' ? 1 : 0;
    this.maskState = 2;
    setTimeout(function () {
      _this.maskState = state;
    }, timer);
  },
  numberChange: function (data) {
    this.number = data.number;
  },
  changePayType: function (type) {
    this.payType = type;
  },
  submit: function () {
    wx.redirectTo({
      url: '/pages/money/pay'
    });

  },
  stopPrevent: function () { },

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