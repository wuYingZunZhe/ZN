var md5 = require('../../utils/md5.js')
var interval = null //倒计时函数
var timestamp = Date.parse(new Date());
var val = 'fanbuyhainan' + timestamp.toString();
var hexMD5 = md5.hexMD5(val);
var app = getApp();

Page({
    data: {
        mobile:"",
    },
    formSubmit:function(e){
        console.log(e.detail.value)
        // console.log(e.detail.value.mobile)
        // console.log(e.detail.value.password)
        var mobile = e.detail.value.mobile;
        var status="";
        var psd = md5.hexMD5(e.detail.value.password);
        // console.log(psd)
        if (mobile.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile)){
            wx.showModal({
                title: '提示',
                content: '手机号输入有误',
            })
        }else{
            wx: wx.request({
                url: 'https://exbuy.double.com.cn/api/users/login',
              data: {
                request_object: app.globalData.request_object,
                    mobile: e.detail.value.mobile,
                    password: psd,
                    timestamp: timestamp,
                  process: hexMD5
                },
                // header: {},
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                  console.log(39,res)
                  app.globalData.user_id = res.data.data.user_id;
                  app.globalData.token = res.data.data.token;
                  let userInfokey = wx.getStorageSync('userInfokey');
                  userInfokey.user_id = res.data.data.user_id
                  userInfokey.token = res.data.data.token;
                  wx.setStorageSync('userInfokey', userInfokey)
                    status = res.data.status
                    if (status == 1) {
                        wx.navigateTo({
                            url: '../orderOrPayment/orderOrPayment',
                        })
                    } else {
                        wx.showToast({
                            title: '密码错误',
                            icon: 'none'
                        })
                        console.log("出错了")
                    }
                },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
            
       
    },
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