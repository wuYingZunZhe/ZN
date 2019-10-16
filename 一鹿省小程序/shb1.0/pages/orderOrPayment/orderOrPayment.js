// pages/orderOrPayment/orderOrPayment.js
var app = getApp();
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');
var timestamp =0;
var store_id='';
var user_id='';
var token='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlename: '',
    isUser:false,
    isPhone: false,
    hasGoods:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 242424242424242424242424)
    let that = this;
    this.options = options;
    let store_info = wx.getStorageSync('store_info');

    var userInfo = wx.getStorageSync('userInfoKey');
    var globalKey = wx.getStorageSync('globalKey');
    if (globalKey.hasOwnProperty('user_id') && globalKey.user_id) {
      user_id = globalKey.user_id;
      token = globalKey.token;
    } else {
      app.showLoading();
      app.checkOpenid().then(() => {
        util.showModal(that, app);
      })
    }

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          containerH: res.screenHeight - 80
        })
      },
    })

    let scene = util.praseStrEmpty(options.scene);
    if (util.praseStrEmpty(options.store_id) != '') {
      store_id = options.store_id;
    } else {
      store_id = options.store_id_new;
    }
    this.setData({
      titlename: options.store_name || '',
      store_id,
      user_id,
      token,
      userInfo,
    })
    this.getStoreData()
  },
  toStoreDetail(){
    let that=this;
    app.showLoading();
    var timer=setTimeout(function(){
      wx.hideLoading();
      wx.navigateTo({
        url: "../storeDetails/storeDetails?store_id=" + that.data.store_id + "&user_id=" + that.data.user_id + "&token=" + that.data.token + "&category_id=" + that.data.category_id
      })
      clearTimeout(timer)
    },500)
  },
  getStoreData(e){
    let that=this;
    let store_info = wx.getStorageSync('store_info') || {};
    let scene = util.praseStrEmpty(this.options.scene);
    let store_id = this.data.store_id;
    let index = util.praseStrEmpty(e) != '' ?  e.currentTarget.dataset.index:2;
    
    if (store_info.store_id != store_id) {
      let choosedList = [];
      let order_info = [];
      wx.setStorageSync('choosedList', choosedList);
      wx.setStorageSync('order_info', order_info);

      store_info.store_id = store_id;
      if (util.praseStrEmpty(this.options.store_id) != '') {
        store_info.table_number = '';
        scene = 1;
      } else {
        store_info.table_number = this.options.table_number;
      }

      wx.setStorageSync('store_info', store_info);
      // 店铺详情//商品列表
      util.storeInfo(that, store_id, user_id, scene, app, index);
    } else {
      store_info.table_number = this.options.table_number;
      if (this.options.hasOwnProperty("scene")) {

        util.storeInfo(that, store_id, user_id, scene, app, index);
      }
    }
  },
  handleContact(e){
    console.log(e,153)
  },
  toHome:function(){

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    console.log(prevPage,86666)
    if (prevPage) {
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    } else {
      wx.switchTab({
        url: '../home/index',
      })
    }
  },
  getPhoneNumber: function (e) {
    let that = this;
    app.getPhoneNumber(e,that,3)
  },
  
  getUserInfo: function(e){
    let that = this;
    app.getUserInfo(e, that,3)
  },
  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotoPay() {
    console.log(wx.getStorageSync('store_info'))
    timestamp = Date.parse(new Date());
    var val = 'fanbuyhainan' + timestamp.toString();
    var hexMd5 = md5.hexMD5(val);
    wx.request({
      url: app.globalData.url +'/api/mini_program/get_config_info',
      method:"post",
      data:{
        timestamp, process: hexMd5, request_object: app.globalData.request_object,
      },
      success:function(res){
        // console.log(res.data.data)
        if (res.data.data.is_open_payment==1){
          wx.navigateTo({
            url: '../payment/payment',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '该功能暂未开放，敬请期待！',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  
  closeshowModal(e){
    app.showText('您若不登录将无法进行点单哦', this);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let store_info = wx.getStorageSync('store_info');
    console.log(store_info)
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_id + '&store_name=' + store_info.store_name ,
      success: function (res) {

      }
    }

  },
})