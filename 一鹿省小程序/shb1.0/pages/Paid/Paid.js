var app = getApp();
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');
var timestamp = Date.parse(new Date());

Page({
    /**
     * 页面的初始数据
     */
    data: {
        store_name: '',
        store_logo: '',
        orderList: [],
        account_money: '',
        discount_price: '',
        service_money: '',
        save_money: '',
        no_discount_price: '',
        add_time: '',
        remark: '',
        order_number: '',
        table_number: '',
        actual_money: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      let userInfokey = wx.getStorageSync('userInfokey');
      let token = app.globalData.token || userInfokey.token
      var val = 'fanbuyhainan' + timestamp.toString() + token;
      var hexMD5 = md5.hexMD5(val);
        wx.request({
            url: app.globalData.url+'/api/store_order/get_order_info',
            data: {
              user_id: app.globalData.user_id || userInfokey.user_id,
                order_id: app.globalData.order_id,
                token,
                timestamp: timestamp,
              process: hexMD5,
              request_object: app.globalData.request_object,
            },
            method: 'POST',
            header: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            success: function (res) {
                if (res.data.status == 1) {
                    console.log("订单详情返回数据", res.data)
                    that.setData({
                        add_time: res.data.data.add_time,
                        actual_money: res.data.data.actual_money,
                        remark: res.data.data.remark,
                        store_logo: res.data.data.store_logo,
                        store_name: res.data.data.store_name,
                        account_money: res.data.data.account_money,
                        discount_price: res.data.data.discount_price,
                        save_money: res.data.data.save_money,
                        service_money: res.data.data.service_money,
                        no_discount_price: res.data.data.no_discount_price,
                        orderList: res.data.data.list_goods,
                        table_number: res.data.data.table_number,
                        order_number: res.data.data.order_number
                    })
                } else {
                    console.log("我的订单详情请求失败", res.data)
                }
            },
            fail: function () {
                // fail
                console.log("服务器响应失败");

            },
            complete: function () {
                // complete
            }
        })
    },
    toEva:function(){
        // wx.navigateTo({
        //     url: '../../eva',
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        // })
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
    console.log(store_info)
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: 'pages/orderOrPayment/orderOrPayment?store_id=' + store_info.store_id,
      success: function (res) {

      }
    }

  },
})